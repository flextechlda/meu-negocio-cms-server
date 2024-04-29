import express from "express";

import {
    SearchUsers,
    UpdateEmail,
    UpdateUserData,
    GetAllUsersData,
    GetUserDataById,
    DeleteUserAccount,
} from "../../controllers/users";

const router = express.Router();

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
