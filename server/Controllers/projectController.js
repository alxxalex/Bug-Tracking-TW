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

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.projectId);
    if (project) {
      await project.destroy();
      return res.status(200).json("Project deleted");
    } else {
      return res
        .status(404)
        .json({ error: `Project with id ${req.params.projectId} not found` });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateProject = async (req, res) => {
  console.log("Out");
  const project = await Project.findByPk(req.params.projectId);
  if (project) {
    console.log(project);
    const updatedProject = await project.update(req.body);
    return res.status(200).json(updatedProject);
  } else {
    return res
      .status(404)
      .json({ error: `Project with id ${req.params.projectId} not found` });
  }
};

const getProjectById = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.projectId);
    if (!project) {
      return res
        .status(404)
        .json({ error: `Project with id ${req.params.projectId} not found` });
    }
    return res.status(200).json(project);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export {
  insertProjectIntoDb,
  getProjectsFromDb,
  deleteProject,
  updateProject,
  getProjectById,
};
