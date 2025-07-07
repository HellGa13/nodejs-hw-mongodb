import { initMongoDB } from './src/server.js';
import { startServer } from './src/db/initMongoDB.js';

const bootstrap = async () => {
  await initMongoDB();
  startServer();
};

bootstrap();

