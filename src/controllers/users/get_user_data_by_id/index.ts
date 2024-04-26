import { Request, Response } from "express";
import db from "../../../models/db";

export async function GetUserDataById(req: Request, res: Response) {
    const user_id = req.query.user_id;

    let sql = `
        select 

            id,
            username,
            phone,
            email,
            entry_date

        from users where id = ? limit 1;
    `;

    db.query(sql, [user_id], (err, result: any) => {
        //if there was found any user with the value provided
        if (result.length > 0) {
            return res.json({
                user_data: result[0],
                success: true,
            });
        }

        //if there wasn't found any user with the values provided
        else if (result.length == 0) {
            return res.json({
                message: "User doesn't exist",
                display_message: "Usuario não existe",
                success: false,
                user_data: {},
            });
        }

        if (err) {
            console.error(err);
            return res.json({
                message: "Error searching for user data",
                display_message: "Falha ao pesquisar dados de usuario",
                success: false,
                user_data: {},
            });
        }
    });
}
