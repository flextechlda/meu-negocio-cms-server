import express from "express";
const router = express.Router();

import users_routes from "./users";
import managers from "./managers";
import auth from "./auth";
import graphics from "./graphics";

router.use("/users", users_routes);
router.use("/auth/users", auth);
router.use("/managers", managers);
router.use("/graphics", graphics);

export default router;
