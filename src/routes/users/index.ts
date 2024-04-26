import express from "express";
import multer from "multer";

import {
    SearchUsers,
    UpdateEmail,
    UpdateUserData,
    GetAllUsersData,
    GetUserDataById,
    DeleteUserAccount,
} from "../../controllers/users";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//get requests
router.get("/get-all-users", GetAllUsersData);
router.get("/get-user-data-by-id", GetUserDataById);
router.get("/search-user", SearchUsers);

// put requests
router.put("/update-email", UpdateEmail);
router.put("/update-user-data", UpdateUserData);

// delete requests
router.delete("/delete-user-account", DeleteUserAccount);

export default router;
