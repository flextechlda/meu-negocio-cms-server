import express from "express";

import {
    Signin,
    GetAllManagersData,
    GetManagerDataById,
    RegisterManager,
    SearchManagers,
    UpdateEmail,
    UpdateManagerData,
    UpdatePassword,
    DeleteManagerAccount,
} from "../../controllers/managers";

const router = express.Router();

router.post("/signin", Signin);

router.get("/get-all-managers-data", GetAllManagersData);
router.get("/get-manager-data-by-id", GetManagerDataById);
router.post("/register-manager", RegisterManager);
router.get("/search-managers", SearchManagers);
router.put("/update-email", UpdateEmail);
router.put("/update-manager-data", UpdateManagerData);
router.put("/update-password", UpdatePassword);
router.delete("/delete-manager-account", DeleteManagerAccount);

export default router;
