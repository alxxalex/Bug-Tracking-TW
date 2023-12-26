import { Project } from "../models/project.js";

const insertProjectIntoDb = async (req, res) => {
  try {
    const newProject = await Project.create(req.body);
    return res.status(201).json(newProject);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getProjectsFromDb = async (req, res) => {
  try {
    const projects = await Project.findAll();
    return res.status(200).json(projects);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export { insertProjectIntoDb, getProjectsFromDb };
