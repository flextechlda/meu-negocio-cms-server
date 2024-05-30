import { Request, Response } from "express";
import db from "../../../models/db";
import axios from "axios";

export async function SendPasswordVerificationCode(
    req: Request,
    res: Response
) {
    const { email } = req.body;
    let sql = `select id, username, phone from users where email = ? limit 1;`;

    db.query(sql, [email], (err, result: any) => {
        if (result.length == 0) {
            return res.json({
                message: `The email doesn't exist in the database!`,
                display_message: `O email não existe na base de dados`,
                success: false,
            });
        }

        if (err) {
            return res.json({
                message: `Error searching for the user's email!`,
                display_message: `Ocorreu um erro ao pesquisar o email`,
                success: false,
            });
        }

        if (result.length > 0) {
            sendCodeToEmail(result[0]);
        }
    });

    async function sendCodeToEmail(user_data: {
        id: string;
        username: string;
        phone: string;
    }) {
        try {
            const id_length = user_data.id.length;
            const code = `5${
                user_data.id[0] +
                7 +
                user_data.id[3] +
                user_data.id[id_length - 1] +
                "7" +
                user_data.id[2]
            }`;

            let response = await axios.post(
                "https://meusgastos.flextech.co.mz/verificar.php",
                new URLSearchParams({
                    numero: `${user_data?.phone}`,
		    mensagem: `O seu codigo de redifinição de senha é: ${code}`
                })
            );

return res.json({
                    message: `The code was sent successfuly!`,
                    display_message: `O codigo foi enviado para o numero: ${user_data?.phone} com sucesso.`,
                    success: true,
                    code: code,
                });



            /*if (!response?.data?.success) {
                return res.json({
                    message: `The code was not sent successfuly!`,
                    display_message: `O codigo não foi enviado com sucesso para o numero: ${user_data?.phone}.`,
                    success: false,
                });
            } else {
                return res.json({
                    message: `The code was sent successfuly!`,
                    display_message: `O codigo foi enviado para o numero: ${user_data?.phone} com sucesso.`,
                    success: true,
                    code: code,
                });
            }*/
        } catch (error) {
            console.error(error);

            return res.json({
                message: `The code was not sent successfuly!`,
                display_message: `Ocorreu um erro ao enviar o codigo para o numero: ${user_data?.phone}`,
                success: false,
            });
        }
    }
}
