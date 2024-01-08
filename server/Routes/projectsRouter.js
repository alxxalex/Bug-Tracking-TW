import express from "express";
import * as projectControllerMethods from "../Controllers/projectController.js";

const router = express.Router();

router.post("/newProject", projectControllerMethods.insertProjectIntoDb);

router.get("/projects", projectControllerMethods.getProjectsFromDb);

router.delete(
  "/deleteProject/:projectId",
  projectControllerMethods.deleteProject
);

router.put("/updateProject/:projectId", projectControllerMethods.updateProject);

router.get("/projects/:projectId", projectControllerMethods.getProjectById);

export { router as projectsRouter };
