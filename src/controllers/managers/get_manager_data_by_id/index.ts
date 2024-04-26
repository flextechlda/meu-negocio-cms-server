import { Request, Response } from "express";
import db from "../../../models/db";

export async function GetManagerDataById(req: Request, res: Response) {
    const { manager_id } = req.query;
    let sql = `
        select 
        
            id,
            email,
            name,
            role,
            phone
            
        from managers where id = ? limit 1;
    `;

    db.query(sql, [manager_id], (err, result: any) => {
        //if there was found any manager with the value provided
        if (result.length > 0) {
            return res.json({
                manager_data: result[0],
                success: true,
            });
        }

        //if there wasn't found any manager with the values provided
        else if (result.length == 0) {
            return res.json({
                message: "The manager doesn't exist!",
                display_message: "O Gerenciador não existe!",
                success: false,
            });
        }

        if (err) {
            console.error(err);
            return res.json({
                message: "An error ocurred while searching the manager's data ",
                display_message:
                    "Ocorreu um erro ao pesquisar os dados do Gerenciador",
                success: false,
            });
        }
    });
}
