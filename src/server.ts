// internal modules
import express from "express";
import cors from "cors";
import { resolve } from "path";
import dotenv from "dotenv";
dotenv.config();

// externals modules
import db from "./models/db";
import server_routes from "./routes";

const app = express();

const corsOptions = {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};

//middlewares and the routing
app.use(cors(corsOptions));
app.use(express.json({ limit: 100000000 }));
app.use(express.static(resolve(__dirname, "../public")));
app.set("trust proxy", true); // Enable trust for proxies to be able to get the request's ip
app.use("/api", server_routes);

app.get("/", async (request, response) => {
    response.sendFile(resolve(__dirname, "../public/index.html"));
});

app.get("/api/current-mobile-app-version", async (request, response) => {
    response.json({
        current_mobile_app_version: "1.0.4",
        download_link: "https://expo.dev/artifacts/eas/wH3UNM2Jq7YTmSVHwzsp1b.apk",
    });
});

app.post("/api/store-offline-data-in-cloud", async (request, response) => {
    let { querie } = request.body;

    //inserting a new data into the database
    db.query(querie, (err, result) => {
        if (result) {
            return response.json({
                message: "Data record saved successfuly!",
                display_message: "A informação foi guardada com sucesso!",
                success: true,
            });
        }

        if (err) {
            console.error(err);
            return response.json({
                message: "Data record not saved successfuly!",
                display_message: "A informação não foi guardada com sucesso!",
                success: false,
            });
        }
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>
    console.log("\n\n[server]: the server is running on port " + PORT)
);
