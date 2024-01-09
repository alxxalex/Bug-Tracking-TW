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
      return res.status(400).json({ message: 'Project name is required' });
    }
    
    const bugsForProject = await Bug.findAll({
      where: { projectName },
    });

    if (bugsForProject.length === 0) {
      return res.status(404).json({ message: 'No bugs found for this project' });
    }
    return res.status(200).json(bugsForProject);

  } catch (err) {
    return res.status(500).json(err);
  }
}

export { insertBugIntoDb, getBugsFromDb, getBugsForProject };
