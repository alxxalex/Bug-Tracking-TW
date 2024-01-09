import express from "express";
import * as bugControllerMethods from "../Controllers/bugController.js";

const router = express.Router();

router.post("/newBug", bugControllerMethods.insertBugIntoDb);

router.get("/bugs", bugControllerMethods.getBugsFromDb);

router.get("/bugs/:projectName",bugControllerMethods.getBugsForProject)

export { router as bugsRouter };
