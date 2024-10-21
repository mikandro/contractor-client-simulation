import { sequelize } from '../src/models';
import { initializeDatabase } from '../src/models';

beforeAll(async () => {
  await initializeDatabase();
});

afterAll(async () => {
  await sequelize.close();
});

