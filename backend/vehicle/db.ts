import { SQLDatabase } from 'encore.dev/storage/sqldb';

export const vehicleDB = new SQLDatabase("vehicle", {
  migrations: "./migrations",
});
