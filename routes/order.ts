import { Router, Request, Response } from "express";
import {
  validateIdIsPresentAndIsInteger,
  validateOrderRequest,
} from "../middlewares";
import Order from "../models/Order";

export const orderRouter = Router();

orderRouter.post(
  "/orders",
  validateOrderRequest,
  async (req: Request, res: Response) => {
    const orderPayload = req.body;

    try {
      const order = await Order.create(orderPayload);

      return res.status(201).json(order);
    } catch (error) {
      console.log("Error while creating Order ", error);

      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

orderRouter.get(
  "/orders/:id",
  validateIdIsPresentAndIsInteger,
  async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
      const order = Order.findByPk(id);

      if (!order) {
        return res
          .status(404)
          .json({ message: `Order with Id ${id} was not found` });
      }

      return res.status(200).json(order);
    } catch (error) {
      console.log("Error while querying for Order: ", error);

      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

orderRouter.get("/orders", async (req: Request, res: Response) => {
  try {
    const orders = await Order.findAll();

    res.status(200).json(orders);
  } catch (error) {
    console.log("Error while querying the orders: ", error);

    res.status(500).json({ message: "Internal Server Error" });
  }
});
