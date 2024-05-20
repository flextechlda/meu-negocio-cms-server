import { Request, Response } from "express";
import db from "../../../models/db";
import { hash } from "bcrypt";
import { generate } from "short-uuid";

export async function SignUp(req: Request, res: Response) {
    let { username, password, email, phone } = req.body;

    let entry_date = new Date().toISOString().slice(0, 19).replace("T", " ");
    let hashedPassword = await hash(password, 10);
    let id = generate();

    let sql = `select email from users where email = ? limit 1;`;

    db.query(sql, [email], (err, result: any) => {
        if (err) {
            console.error(err);
            return res.json({
                message: "Error registering the user into the database",
                display_message: "Falha ao registrar o usuario",
                success: false,
            });
        }

        //if there already is a user with a similar email
        if (result.length > 0) {
            return res.json({
                message: `Email already taken`,
                display_message: `Você não pode usar este email!`,
                success: false,
            });
        }

        if (result.length == 0) {
            let sql = `
                insert into users 
                    (
                        id,
                        username,
                        phone,
                        email,
                        password,
                        entry_date
                    )
                    
                    values(?,?,?,?,?,?);
            `;
            let sql_values = [
                id,
                username,
                phone,
                email,
                hashedPassword,
                entry_date,
            ];

            //inserting a new user into the database
            db.query(sql, sql_values, (err, result) => {
                if (result) {
                    let user_data = [id, username, phone, email, entry_date];

                    res.json({
                        message: "Account Created Succesfuly!",
                        display_message: "Conta criada com sucesso!",
                        success: true,
                        user_data: user_data,
                    });

                    createSession(id);
                }

                if (err) {
                    console.error(err);
                    return res.json({
                        message: "Error registering the user",
                        display_message: "Falha ao registrar o usuario",
                        success: false,
                    });
                }
            });
        }
    });
}

function createSession(user_id: string) {
    let currentDate = new Date();
    let futureDate = new Date(currentDate);

    // Adding 7 days to the current date
    futureDate.setDate(currentDate.getDate() + 7);

    let created_at = new Date().toISOString().slice(0, 19).replace("T", " ");
    let expires_at = futureDate.toISOString().slice(0, 19).replace("T", " ");

    let sql = `
                insert into session 
                    (
                        user_id,
                        created_at,
                        expires_at
                    )
                    
                    values(?,?,?);
            `;
    let sql_values = [user_id, created_at, expires_at];

    //inserting a new session into the database
    db.query(sql, sql_values, (err, result) => {
        if (result) {
            console.log("Session Created Successfuly");
        }

        if (err) {
            console.error("Error Creating The Session", err);
        }
    });
}
