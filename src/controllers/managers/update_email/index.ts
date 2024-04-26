import { Request, Response } from "express";
import db from "../../../models/db";

export async function UpdateEmail(req: Request, res: Response) {
    const { manager_id, email } = req.body;
    let sql = `select email from managers where  email = ? limit 1;`;

    db.query(sql, [email], (err, result: any) => {
        // if there was an error
        if (err) {
            console.error(err);
            return res.json({
                message: `There was an error searching for the manager's email!`,
                display_message: `Falha ao pesquisar o email!`,
                success: false,
            });
        }

        // if the provided email exists
        if (result.length > 0) {
            return res.json({
                message: `The email is invalid!`,
                display_message: `Email invalido!`,
                success: false,
            });
        } else {
            let sql = `update managers set email = ? where id = ?;`;

            db.query(sql, [email, manager_id], (err, result) => {
                // if there was an error
                if (err) {
                    console.error(err);
                    return res.json({
                        message: `There was an error updating the manager's email`,
                        display_message: `Falha ao atualizar o email`,
                        success: false,
                    });
                }

                // if there is not an error
                return res.json({
                    message: `The email was updated!`,
                    display_message: `Email atualizado com sucesso!`,
                    success: true,
                });
            });
        }
    });
}
