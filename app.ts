import express, { Express } from "express";
import { initDbAndSequelize } from "./database";

export const { db, sequelize } = initDbAndSequelize();

const app: Express = express();

app.listen(3000, async () => {
  await sequelize.sync();
  console.log("Server is running at http://localhost:3000");
});
