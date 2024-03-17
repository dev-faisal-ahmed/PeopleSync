import { Server } from 'http';
import mongoose from 'mongoose';
import { mongoUri, port } from '../config';
import { app } from './app';
import { SeedAdmin } from '../auto-start/seed-admin';

let server: Server;

async function main() {
  try {
    await mongoose.connect(mongoUri);
    // create admin if there is no admin
    await SeedAdmin();
    server = app.listen(port, () => {
      console.log(`App is listening to the port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

process.on('uncaughtException', () => {
  console.log(`Uncaught exception has occurred, shutting down the server`);
  process.exit(1);
});

// handling the unhandled rejections
process.on('unhandledRejection', () => {
  console.log(
    `Sorry we are facing unhandled rejection, shutting down the server`,
  );
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
