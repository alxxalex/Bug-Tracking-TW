import { Bug } from "../models/bug.js";

const insertBugIntoDb = async (req, res) => {
  try {
    const newBug = await Bug.create(req.body);
    return res.status(201).json(newBug);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getBugsFromDb = async (req, res) => {
  try {
    const bugs = await Bug.findAll();
    return res.status(200).json(bugs);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export { insertBugIntoDb, getBugsFromDb };
