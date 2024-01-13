import express from "express";
import * as projectControllerMethods from "../Controllers/projectController.js";

const router = express.Router();

router.post(
  "/newProject/:userId",
  projectControllerMethods.insertProjectIntoDb
);

router.get("/projects", projectControllerMethods.getProjectsFromDb);

router.delete(
  "/deleteProject/:projectId",
  projectControllerMethods.deleteProject
);

router.put("/updateProject/:projectId", projectControllerMethods.updateProject);

router.get("/projects/:projectId", projectControllerMethods.getProjectById);

router.get(
  "/projects/user/:userId",
  projectControllerMethods.getProjectsByUser
);

router.post(
  "/joinProject/:userId/:projectId",
  projectControllerMethods.joinProject
);

export { router as projectsRouter };
