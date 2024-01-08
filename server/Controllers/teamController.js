import { Team } from "../models/team.js";

const insertTeamIntoDb = async (req, res) => {
  try {
    const newTeam = await Team.create(req.body);
    return res.status(201).json(newTeam);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getTeamsFromDb = async (req, res) => {
  try {
    const teams = await Team.findAll();
    return res.status(200).json(teams);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export { insertTeamIntoDb, getTeamsFromDb };
