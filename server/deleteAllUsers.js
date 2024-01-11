import { User } from "./models/user.js";
import { sequelize } from "./sequelize.js";

const deleteAllUsers = async () => {
  try {
    await User.destroy({
      where: {},
      truncate: true,
    });
    console.log("All users have been deleted successfully.");
  } catch (error) {
    console.error("Error deleting users:", error);
  }
};

deleteAllUsers();

