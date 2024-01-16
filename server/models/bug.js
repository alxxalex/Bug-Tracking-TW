import { DataTypes } from "sequelize";
import { sequelize } from "../sequelize.js";

const Bug = sequelize.define("Bug", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  severity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  priority: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  commitLink: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isUrl: {
        msg: "Must be a valid URL",
      },
    },
  },
  raisedBy: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  assignedProjectMember: {
    type: DataTypes.STRING,
  },
  projectName: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.STRING,
  },
  commitLinkBugSolved: {
    type: DataTypes.STRING,
    validate: {
      isUrl: {
        msg: "Must be a valid URL",
      },
    },
  },
});

export { Bug };
