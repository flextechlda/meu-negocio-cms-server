import { Request, Response } from "express";
import db from "../../../models/db";

export async function GetGeneralData(req: Request, res: Response) {
    let sql = `select count(*) as length from users;`;

    try {
        db.query(sql, (err, result: any) => {
            let total_users = result[0].length;
            let sql = `select count(*) as length from stocks;`;

            db.query(sql, (err, result: any) => {
                let total_stocks = result[0].length;
                let sql = `select count(*) as length from sales;`;

                db.query(sql, (err, result: any) => {
                    let total_sales = result[0].length;
                    let sql = `select count(*) as length from products;`;

                    db.query(sql, (err, result: any) => {
                        let total_products = result[0].length;

                        return res.json({
                            data: {
                                total_users,
                                total_stocks,
                                total_sales,
                                total_products,
                            },
                            success: true,
                        });
                    });
                });
            });
        });
    } catch (error) {
        return res.json({
            success: false,
        });
    }
}
