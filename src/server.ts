import app from './app';
import { initializeDatabase } from './models';

init();

async function init() {
  try {
    await initializeDatabase()
    app.listen(3001, () => {
      console.log('Express App Listening on Port 3001');
    });
  } catch (error) {
    console.error(`An error occurred: ${JSON.stringify(error)}`);
    process.exit(1);
  }
}
