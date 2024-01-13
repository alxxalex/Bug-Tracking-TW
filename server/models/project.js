import { DataTypes } from "sequelize";
import { sequelize } from "../sequelize.js";

const Project = sequelize.define("Project", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  repositoryLink: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isUrl: {
        msg: "Must be a valid URL",
      },
    },
  },
});

export { Project };
