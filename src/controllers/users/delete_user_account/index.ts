import { Request, Response } from "express";
import db from "../../../models/db";

export async function DeleteUserAccount(req: Request, res: Response) {
    const user_id = req.query.user_id as string;
    const sql = `delete from users where id = ?;`;

    db.query(sql, [user_id], (err, result) => {
        if (err) {
            console.error(err);
            return res.json({
                message: `Error deleting the account!`,
                display_message: `Falha ao deletar a conta!`,
                success: false,
            });
        }

        return res.json({
            message: `Account deleted successfuly!`,
            display_message: `Conta deletada com sucesso!`,
            success: true,
        });
    });
}
