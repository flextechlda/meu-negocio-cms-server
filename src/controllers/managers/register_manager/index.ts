import { Request, Response } from "express";
import db from "../../../models/db";
import { generate } from "short-uuid";
import { hash } from "bcrypt";

export async function RegisterManager(req: Request, res: Response) {
    const { email, name, role, password, phone } = req.body;
    const hashedPassword = await hash(password, 10);
    const id = generate();

    let sql = `select email from managers where email = ? limit 1;`;

    db.query(sql, [email], (err, result: any) => {
        if (err) {
            console.error(err);
            return res.json({
                message: "Error searching  manager's email ",
                display_message: "Falha ao adicionar Gerenciador ",
                success: false,
            });
        }

        //if there already is a user with a similar email
        if (result.length > 0) {
            return res.json({
                message: `The email is already in use!`,
                display_message: `O Email encontra-se em uso!`,
                success: false,
            });
        }

        if (result.length == 0) {
            let sql = `
                insert into managers 
                    (
                        id,
                        email,
                        name,
                        role,
                        password,
                        phone
                    )
                    
                    values(?,?,?,?,?,?);
            `;
            let sql_values = [id, email, name, role, hashedPassword, phone];

            //inserting a new manager into the database
            db.query(sql, sql_values, (err, result) => {
                if (result) {
                    return res.json({
                        message: "Account created successfuly!",
                        display_message: "Conta criada com sucesso!",
                        success: true,
                    });
                }

                if (err) {
                    console.error(err);
                    return res.json({
                        message: "An error ocurred while adding the manager",
                        display_message:
                            "Ocorreu um erro ao adicionar o Gerenciador",
                        success: false,
                    });
                }
            });
        }
    });
}
