import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './sqlite/Bug-Tracking.db'
})

sequelize.sync({ alter: true }).then(()=>{
    console.log('models synched')
})

export { sequelize }