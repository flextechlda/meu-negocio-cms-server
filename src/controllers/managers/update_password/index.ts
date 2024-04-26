import { Request, Response } from "express";
import db from "../../../models/db";
import { compare, hash } from "bcrypt";

export async function UpdatePassword(req: Request, res: Response) {
    const { password, new_password, manager_id } = req.body;
    const hashedPassword = await hash(new_password, 10);

    let sql = `select password from managers where id = ? limit 1;`;

    db.query(sql, [manager_id], (err, result: any) => {
        if (err) {
            console.error(err);
            return res.json({
                message:
                    "An error ocurred while searching for the manager's password!",
                display_message: "Falha ao pesquisar dados!",
                success: false,
            });
        }

        //if there was found any manager with the values provided
        if (result.length > 0) {
            compareHash(password, result[0].password);
        }

        //if there wasn't found any manager with the values provided
        if (result.length == 0) {
            return res.json({
                message: "The manager does not exist!",
                display_message: "O usuario não existe!",
                success: false,
            });
        }
    });

    // compares password with the stored hashed password
    async function compareHash(password: string, userPassword: string) {
        let isMatch = await compare(password, userPassword);

        if (!isMatch) {
            return res.json({
                message: "The password is wrong!",
                display_message: "Palavra passe invalida!",
                success: false,
            });
        }

        // updating the password
        if (isMatch) {
            let sql = `update managers set password = ? where id = ?;`;

            db.query(sql, [hashedPassword, manager_id], (err, result: any) => {
                if (err) {
                    console.error(err);
                    return res.json({
                        message:
                            "There was an error updating the manager's password!",
                        display_message: "Falha ao atualizar palavra passe!",
                        success: false,
                    });
                }

                return res.json({
                    message: "The password was updated!",
                    display_message: "Palavra passe atualizada com sucesso!",
                    success: true,
                });
            });
        }
    }
}
