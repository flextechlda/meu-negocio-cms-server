import { Request, Response } from "express";
import db from "../../../models/db";
import { compare } from "bcrypt";

export async function Signin(req: Request, res: Response) {
    const { password, email } = req.body;

    let sql = `
        select 
            id,
            role,
            email,
            name,
            phone,
            password 
        from managers where email = ? limit 1;
    `;

    db.query(sql, [email], (err, result: any) => {
        if (err) {
            console.error("Erro signin in", err);
            return res.json({
                message: "There was an error login in!",
                display_message: "Falha ao realizar login!",
                success: false,
            });
        }

        //if there was found any manager with the values provided
        if (result.length > 0) {
            compareHash(password, result[0]);
        }

        //if there wasn't found any manager with the values provided
        if (result.length == 0) {
            return res.json({
                message: "The manager doesn't exist",
                display_message: "O usuario não existe!",
                success: false,
            });
        }
    });

    // compares Password with hashedPassword
    async function compareHash(password: any, userData: any) {
        let is_a_match = await compare(password, userData?.password);

        if (!is_a_match) {
            return res.json({
                message: "Wrong password and email combination",
                display_message: "Palavra passe ou email invalido!",
                success: false,
            });
        }

        if (is_a_match) {
            let manager_data = {
                id: userData.id,
                role: userData.role,
                email: userData.email,
                name: userData.name,
                phone: userData.phone,
            };

            return res.json({
                message: "Manager logged in successfuly!",
                display_message: "Logado com sucesso!",
                manager_data: manager_data,
                success: true,
            });
        }
    }
}
