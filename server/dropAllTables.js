import { sequelize } from "./sequelize.js";

async function dropUsersBackupTable() {
    try {
        // Drop the Users_backup table
        await sequelize.getQueryInterface().dropAllTables();

        console.log('Users_backup table dropped successfully');
    } catch (error) {
        console.error('Error dropping Users_backup table:', error);
    } finally {
        // Ensure the Sequelize connection is closed
        await sequelize.close();
    }
}

// Execute the function
dropUsersBackupTable();
