import { Request, Response } from "express";
import db from "../../../models/db";

export async function DeleteManagerAccount(req: Request, res: Response) {
    const manager_id = req.query.manager_id as string;

    let sql = `delete from managers where id = ?;`;
    db.query(sql, [manager_id], (err, result) => {
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
