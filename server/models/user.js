import { DataTypes } from "sequelize";
import { sequelize } from "../sequelize.js";

const User = sequelize.define(
    "User",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // team: {
        //     type: DataTypes.ARRAY(DataTypes.INTEGER),
        //     defaultValue: []
        // },
        tester: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }
);

export { User }