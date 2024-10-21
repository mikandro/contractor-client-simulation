import { Sequelize } from "sequelize";

const isTestEnv = process.env.NODE_ENV === 'test';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: isTestEnv ? ':memory:' : './database.sqlite', // TODO load config file based on env instead of this
  logging: false
});

export async function initializeDatabase() {
  try {
    await sequelize.sync();
    console.info('Database and tables have been created successfully.');
  } catch (error) {
    console.error('Error initializing the database:', error);
  }
}


