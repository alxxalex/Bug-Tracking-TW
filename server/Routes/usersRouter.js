import express from "express";
import * as userControllerMethods from "../Controllers/userController.js";

const router = express.Router();

router.post("/newUser", userControllerMethods.insertUserIntoDb);

router.get("/users", userControllerMethods.getUsersFromDb);

router.post("/authenticate", userControllerMethods.authenticateUser);

router.put("/updateUser/:userId", userControllerMethods.updateUser);

export { router as usersRouter };
