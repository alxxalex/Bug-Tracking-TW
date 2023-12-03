import { DataTypes } from "sequelize";
import { sequelize } from "../sequelize.js";

const User_assignment = sequelize.define(
    "User_assignment",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        project_id:{
            type: DataTypes.INTEGER,
            
        }
    }
)