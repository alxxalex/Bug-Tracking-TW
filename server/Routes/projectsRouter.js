import express from "express";
import * as projectControllerMethods from "../Controllers/projectController.js";

const router = express.Router();

router.post("/newProject", projectControllerMethods.insertProjectIntoDb);

router.get("/projects", projectControllerMethods.getProjectsFromDb);

export { router as projectsRouter };
