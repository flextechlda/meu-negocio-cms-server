import { Request, Response } from "express";
import db from "../../../models/db";
import { useShuffleArray } from "../../../utils/shuffle_array";

export async function SearchManagers(req: Request, res: Response) {
    const { name } = req.query;
    let sql = `
        select 
            
            id,
            email,
            name,
            role,
            password,
            phone
        
        from managers where name like ? limit 50;`;

    db.query(sql, [`%${name}%`], (err, result: any) => {
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
