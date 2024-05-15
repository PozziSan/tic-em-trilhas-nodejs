import express, { Express } from "express";
import bodyParser from "body-parser";
import { initDbAndSequelize } from "./database";
import { orderRouter } from "./routes/order";
import { productRouter } from "./routes/products";

export const { db, sequelize } = initDbAndSequelize();

const app: Express = express();

app.use(bodyParser.json());

app.use(orderRouter);
app.use(productRouter);

app.listen(3000, async () => {
  await sequelize.sync();
  console.log("Server is running at http://localhost:3000");
});
