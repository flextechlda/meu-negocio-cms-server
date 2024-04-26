import { Request, Response } from "express";
import db from "../../../models/db";

export async function UpdateManagerData(req: Request, res: Response) {
    const { name, phone, manager_id } = req.body;
    let sql = `
            update managers set 

                phone = ?, 
                name = ?

            where id = ?;
        `;
    let sql_values = [phone, name, manager_id];

    db.query(sql, sql_values, (error, result) => {
        if (error) {
            console.error(error);
            return res.json({
                message: `There was an error updating the data `,
                display_message: `Falha ao atualizar os dados `,
                success: false,
            });
        }

        return res.json({
            message: `The data was successfuly updated!`,
            display_message: `Os Dados foram atualizados com sucesso!`,
            success: true,
        });
    });
}
