import express from "express";
const router = express.Router();

import {
    SignIn,
    SignUp,
    UpdatePassword,
    SendPasswordVerificationCode,
    RedifyPassword,
} from "../../controllers/auth";

router.post("/signin", SignIn);
router.post("/signup", SignUp);
router.put("/update-password", UpdatePassword);
router.post("/send-password-verification-code", SendPasswordVerificationCode);
router.put("/redify-password", RedifyPassword);

export default router;
