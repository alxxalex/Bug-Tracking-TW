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

const getBugsForProject = async (req, res) => {
  try {
    const { projectName } = req.params;

    if (!projectName) {
      return res.status(400).json({ message: "Project name is required" });
    }

    const bugsForProject = await Bug.findAll({
      where: { projectName },
    });

    if (bugsForProject.length === 0) {
      return res
        .status(404)
        .json({ message: "No bugs found for this project" });
    }
    return res.status(200).json(bugsForProject);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const updateBugStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    if (!id || !status) {
      return res
        .status(400)
        .json({ message: "Bug ID and new status are required" });
    }

    const bugToUpdate = await Bug.findByPk(id);

    if (!bugToUpdate) {
      return res.status(404).json({ message: "Bug not found" });
    }

    bugToUpdate.status = status;
    await bugToUpdate.save();

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
