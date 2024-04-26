import { Request, Response } from "express";
import db from "../../../models/db";
import { hash } from "bcrypt";

export async function RedifyPassword(req: Request, res: Response) {
    const { new_password, email } = req.body;
    const hashedPassword = await hash(new_password, 10);

    let sql = `select id, password from users where email = ? limit 1;`;

    db.query(sql, [email], (err, result: any) => {
        if (err) {
            console.error(err);
            return res.json({
                message: `Error searching for the user's email!`,
                display_message: `Ocorreu um erro ao pesquisar o email`,
                success: false,
            });
        }

        if (result.length == 0) {
            return res.json({
                message: `The email doesn't exist in the database!`,
                display_message: `O email não existe na base de dados`,
                success: false,
            });
        }

        if (result.length > 0) {
            let sql = `update users set password = ? where id = ?;`;

            db.query(
                sql,
                [hashedPassword, result[0].id],
                (err, result: any) => {
                    if (err) {
                        console.error(err);
                        return res.json({
                            message: "Error updating the password!",
                            display_message:
                                "Falha ao atualizar a palavra passe!",
                            success: false,
                        });
                    }

                    return res.json({
                        message: "Password updated successfuly!",
                        display_message:
                            "Palavra passe atualizada com sucesso!",
                        success: true,
                    });
                }
            );
        }
    });
}
