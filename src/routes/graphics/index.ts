import express from "express";
const router = express.Router();

import { GetGeneralData } from "../../controllers/graphics";

router.get("/get-general-data", GetGeneralData);

export default router;
