import { Request, Response } from "express";
import db from "../../../models/db";
import { compare } from "bcrypt";

export async function SignIn(req: Request, res: Response) {
    const { password, email } = req.body;

    let sql = `
        select 
            id,
            username,
            phone,
            email,
            password,
            entry_date
        from users where email = ? limit 1;
    `;

    db.query(sql, [email], (err, result: any) => {
        if (err) {
            console.error(err);
            return res.json({
                message: "Error searching for user data!",
                display_message: "Falha ao fazer login!",
                success: false,
            });
        }

        //if there was found any user with the values provided
        if (result.length > 0) {
            compareHash(password, result[0].password, result[0]);
        }

        //if there wasn't found any user with the values provided
        if (result.length == 0) {
            return res.json({
                message: "User doesn't exist!",
                display_message: "Usuario não existe!",
                success: false,
            });
        }
    });

    // compares Password with hashedPassword
    async function compareHash(
        password: any,
        userPassword: any,
        userData: any
    ) {
        let isMatch = await compare(password, userPassword);

        if (!isMatch) {
            return res.json({
                message: "Invalid Email or Password",
                display_message: "Palavra passe ou email invalido!",
                success: false,
            });
        }
        if (isMatch) {
            let user_data = {
                phone: userData.phone,
                username: userData.username,
                id: userData.id,
                email: userData.email,
                entry_date: userData.entry_date,
            };

            res.json({
                message: "Logged in successfuly",
                display_message: "Logado com sucesso!",
                user_data: user_data,
                success: true,
            });
        }
    }
}
