import express from "express";
import * as userControllerMethods from "../Controllers/teamController.js";

const router = express.Router();

router.post("/newTeam", userControllerMethods.insertTeamIntoDb);

router.get("/teams", userControllerMethods.getTeamsFromDb);

export { router as teamsRouter };
