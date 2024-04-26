import { Request, Response } from "express";
import { createTransport } from "nodemailer";
import db from "../../../models/db";

export async function SendPasswordVerificationCode(
    req: Request,
    res: Response
) {
    const { email } = req.body;
    let sql = `select id, username from users where email = ? limit 1;`;

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

            const transporter = createTransport({
                host: "smtp-relay.brevo.com",
                port: 587,
                auth: {
                    user: "fluentacademy00@gmail.com",
                    pass: process.env.BREVO_SMPTP_KEY,
                },
            });

            await transporter.sendMail({
                from: "fluentacademy00@gmail.com",
                to: email,
                subject: "Codigo de redifinição da sua senha",
                html: `
                <p style="line-height: 30px; white-space: pre-wrap; margin-top: 30px;">Olá ${user_data.username}!</p>

                <p style="line-height: 30px; white-space: pre-wrap; margin-top: 30px;">O seu codigo de redifinição da sua senha é: ${code}</p>
                `,
            });

            return res.json({
                message: `The code was sent successfuly!`,
                display_message: `O codigo foi enviado para o email: ${email} com sucesso.`,
                success: true,
                code: code,
            });
        } catch (error) {
            console.error(error);

            return res.json({
                message: `The code was not sent successfuly!`,
                display_message: `Ocorreu um erro ao enviar o codigo para o email: ${email}`,
                success: false,
            });
        }
    }
}
