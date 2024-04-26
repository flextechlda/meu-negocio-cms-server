import { Request, Response } from "express";
import db from "../../../models/db";
import { compare, hash } from "bcrypt";

export async function UpdatePassword(req: Request, res: Response) {
    const { password, new_password, user_id } = req.body;
    const hashedPassword = await hash(new_password, 10);

    let sql = `select password from users where id = ? limit 1;`;

    db.query(sql, [user_id], (err, result: any) => {
        if (err) {
            console.error(err);
            return res.json({
                message: "Error searching for the user data!",
                display_message: "Falha ao pesquisar dados!",
                success: false,
            });
        }

        //if there wasn't found any user with the values provided
        if (result.length == 0) {
            return res.json({
                message: "User doesn't exist!",
                display_message: "Usuario não existe!",
                success: false,
            });
        }

        //if there was found any user with the values provided
        if (result.length > 0) {
            compareHash(password, result[0].password);
        }
    });

    // compares password with the stored hashed password
    async function compareHash(password: string, userPassword: string) {
        let isMatch = await compare(password, userPassword);

        if (!isMatch) {
            return res.json({
                message: "Invalid password!",
                display_message: "Palavra passe invalida!",
                success: false,
            });
        }

        // updating the password
        if (isMatch) {
            let sql = `update users set password = ? where id = ?;`;

            db.query(sql, [hashedPassword, user_id], (err, result: any) => {
                if (err) {
                    console.error(err);
                    return res.json({
                        message: "Error updating the password!",
                        display_message: "Falha ao atualizar palavra passe!",
                        success: false,
                    });
                }

                return res.json({
                    message: "Password updated successfuly!",
                    display_message: "Palavra passe atualizada com sucesso!",
                    success: true,
                });
            });
        }
    }
}
