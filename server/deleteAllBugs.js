import { Bug } from "./models/bug.js";

const deleteAllBugs = async () => {
  try {
    await Bug.destroy({
      where: {},
      truncate: true,
    });
    console.log("All bugs have been deleted successfully.");
  } catch (error) {
    console.error("Error deleting bugs:", error);
  }
};

deleteAllBugs();
