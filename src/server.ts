// internal modules
import express from "express";
import cors from "cors";
import { resolve } from "path";
import dotenv from "dotenv";
dotenv.config();

// externals modules
import "./models/db";
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

app.get("/", async (req, res) => {
    res.sendFile(resolve(__dirname, "../public/index.html"));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>
    console.log("\n\n[server]: the server is running on port " + PORT)
);
