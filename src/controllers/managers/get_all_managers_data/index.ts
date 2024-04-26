import { Request, Response } from "express";
import db from "../../../models/db";
import { useShuffleArray } from "../../../utils/shuffle_array";

export async function GetAllManagersData(req: Request, res: Response) {
    let sql = `
        select 
            
            id,
            email,
            name,
            role,
            phone
            
        from managers limit 50;`;

    db.query(sql, (err, result: any) => {
        if (result.length > 0) {
            return res.json({
                managers_data: useShuffleArray(result),
                success: true,
            });
        }

        if (err) {
            return res.json({
                message: "Error searching for managers",
                display_message: "Erro ao pesquisar gerenciadores",
                success: false,
            });
        }

        if (result.length == 0) {
            return res.json({
                message: "No managers found",
                display_message: "Nenhum gerenciador encontrado",
                success: false,
            });
        }
    });
}
