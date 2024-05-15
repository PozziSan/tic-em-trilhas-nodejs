import { Database } from "sqlite3";
import { Sequelize } from "sequelize-typescript";

const databaseLocation = "./tic.db";

const createDatabase = () => {
  return new Database(databaseLocation, (error) => {
    if (error) {
      console.log("Error while initializing the database ):");

      return;
    }

    console.log("Database was initialized (:");
  });
};

const createSequelize = () => {
  return new Sequelize({
    dialect: "sqlite",
    storage: databaseLocation,
    models: [__dirname + "/**/models/*.ts"],
  });
};

export const initDbAndSequelize = () => {
  const db = createDatabase();
  const sequelize = createSequelize();

  return { db, sequelize };
};
