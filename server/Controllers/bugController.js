import { Bug } from "../models/bug.js";
import { Project } from "../models/project.js";

const insertBugIntoDb = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.projectId)
    const newBug = await Bug.create(req.body);
    if (project) {
      project.addBug(newBug);
      await newBug.save();
      return res.status(201).json(newBug);
    } else {
      return res.status(404).json({ error: `Project with id ${req.params.projectId} not found` })
    }
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

const getBugsForProject = async (req, res) => {
  try {
    const projectId = req.params.projectId;

    const project = await Project.findByPk(projectId)
    if (project) {
      const bugsForProject = await project.getBugs();

      if (bugsForProject.length === 0) {
        return res
          .status(404)
          .json({ message: "No bugs found for this project" });
      }
      return res.status(200).json(bugsForProject);
    } else {
      return res
        .status(404)
        .json({ message: "Project not found" });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

const updateBugStatus = async (req, res) => {
  try {
    const { id, status, assignedProjectMember } = req.body;

    if (!id || !status || !assignedProjectMember) {
      return res
        .status(400)
        .json({ message: "Bug ID and new status are required" });
    }

    const bugToUpdate = await Bug.findByPk(id);

    if (!bugToUpdate) {
      return res.status(404).json({ message: "Bug not found" });
    }
    if (bugToUpdate.assignedProjectMember === "") {
      bugToUpdate.assignedProjectMember = assignedProjectMember;
      bugToUpdate.status = status;
      await bugToUpdate.save();
    } else if (bugToUpdate.assignedProjectMember == assignedProjectMember) {
      bugToUpdate.status = status;
      await bugToUpdate.save();
    }

    return res.status(200).json(bugToUpdate);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const updateBugSolvedCommitLink = async (req, res) => {
  try {
    const { id, commitLinkBugSolved } = req.body;
    if (!id || !commitLinkBugSolved) {
      return res
        .status(400)
        .json({ message: "Bug ID and new commmit link are required" });
    }

    const bugToUpdate = await Bug.findByPk(id);

    if (!bugToUpdate) {
      return res.status(404).json({ message: "Bug not found" });
    }

    bugToUpdate.commitLinkBugSolved = commitLinkBugSolved;
    await bugToUpdate.save();

    return res.status(200).json(bugToUpdate);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export {
  insertBugIntoDb,
  getBugsFromDb,
  getBugsForProject,
  updateBugStatus,
  updateBugSolvedCommitLink,
};
