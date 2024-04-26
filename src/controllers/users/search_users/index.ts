import { Request, Response } from "express";
import db from "../../../models/db";
import { useShuffleArray } from "../../../utils/shuffle_array";

export async function SearchUsers(req: Request, res: Response) {
    const { username } = req.query;
    let sql = `
        select 
           
            id,
            username,
            phone,
            email,
            entry_date

        from users where username like ? limit 20;`;

    db.query(sql, [`%${username}%`], (err, result: any) => {
        //if there was found any user
        if (result.length > 0) {
            return res.json({
                users_data: useShuffleArray(result),
                success: true,
            });
        }

        if (err) {
            return res.json({
                message: "Error searching for users",
                display_message: "Falha ao pesquisar usuarios",
                success: false,
            });
        }

        //if there wasn't found any user
        if (result.length == 0) {
            return res.json({
                message: "No user found",
                display_message: "Nenhum usuario encontrado",
                success: false,
            });
        }
    });
}
