import { Request, Response } from "express";
import db from "../../../models/db";

export async function UpdateEmail(req: Request, res: Response) {
    const { user_id, email } = req.body;
    let sql = `select email from users where  email = ? limit 1;`;

    db.query(sql, [email], (err, result: any) => {
        // if there was an error
        if (err) {
            console.error(err);
            return res.json({
                message: `Error ssearching the email!`,
                display_message: `Falha ao pesquisar email!`,
                success: false,
            });
        }

        // if the provided email exists
        if (result.length > 0) {
            return res.json({
                message: `Invalid Email!`,
                display_message: `Email invalido!`,
                success: false,
            });
        } else {
            let sql = `update users set email = ? where id = ?;`;

            db.query(sql, [email, user_id], (err, result) => {
                // if there was an error
                if (err) {
                    console.error(err);
                    return res.json({
                        message: `Error updating the email!`,
                        display_message: `Falha ao atualizar o email!`,
                        success: false,
                    });
                }

                // if there is not an error
                return res.json({
                    message: `Email updated successfuly!`,
                    display_message: `Email atualizado com sucesso!`,
                    success: true,
                });
            });
        }
    });
}
