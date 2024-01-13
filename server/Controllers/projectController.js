import { Project } from "../models/project.js";
import { User } from "../models/user.js";

const insertProjectIntoDb = async (req, res) => {
  try {
    const newProject = await Project.create(req.body);
    const user = await User.findByPk(req.params.userId);
    if (user) {
      user.addProject(newProject);
      await user.save();
      return res.status(201).json(newProject);
    } else {
      res.status(404).json({ error: `User not found` });
    }
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

const getProjectsByUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId);
    if (user) {
      const projects = await user.getProjects();
      if (projects.length > 0) {
        res.status(200).json(projects);
      } else {
        res.status(404).json({ error: `Projects not found` });
      }
    } else {
      res.status(404).json({ error: `User not found` });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const joinProject = async (req, res) => {
  const { userId, projectId } = req.params;
  try {
    const user = await User.findByPk(userId);
    const project = await Project.findByPk(projectId);

    if (!user || !project) {
      return res.status(404).send("User or Project not found");
    }

    await user.addProject(project);

    res.status(201).send("User successfully joined the project");
  } catch (error) {
    console.error("Error joining project:", error);
    res.status(500).send(error.message);
  }
};

export {
  insertProjectIntoDb,
  getProjectsFromDb,
  deleteProject,
  updateProject,
  getProjectById,
  getProjectsByUser,
  joinProject,
};
