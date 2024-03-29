import express from "express";
import * as bugControllerMethods from "../Controllers/bugController.js";

const router = express.Router();

router.post("/newBug/:projectId", bugControllerMethods.insertBugIntoDb);

router.get("/bugs", bugControllerMethods.getBugsFromDb);

router.get("/bugs/:projectId", bugControllerMethods.getBugsForProject);

router.put("/bugs/updateBugSatus", bugControllerMethods.updateBugStatus);

router.put(
  "/bugs/updateBugSolvedCommitLink",
  bugControllerMethods.updateBugSolvedCommitLink
);

export { router as bugsRouter };
