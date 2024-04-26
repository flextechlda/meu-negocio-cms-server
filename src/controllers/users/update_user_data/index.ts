import { Request, Response } from "express";
import db from "../../../models/db";

export async function UpdateUserData(req: Request, res: Response) {
    const { phone, name, user_id } = req.body;
    let sql = `
            update users set 

                phone = ?, 
                name = ?

            where id = ?;
        `;
    let sql_values = [phone, name, user_id];

    db.query(sql, sql_values, (error, result) => {
        if (error) {
            console.error(error);

            return res.json({
                message: `Error updating the data`,
                display_message: `Falha ao atualizar os dados`,
                success: false,
            });
        }

        return res.json({
            message: `Data updated successfuly!`,
            display_message: `Os Dados foram atualizados com sucesso!`,
            success: true,
        });
    });
}
