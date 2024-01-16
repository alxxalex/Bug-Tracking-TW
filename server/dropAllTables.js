import { sequelize } from "./sequelize.js";

async function droAllTables() {
    try {
        await sequelize.getQueryInterface().dropAllTables();

        console.log('All tables have been dropped successfully');
    } catch (error) {
        console.error('Error dropping tables:', error);
    } finally {
        await sequelize.close();
    }
}

droAllTables();
