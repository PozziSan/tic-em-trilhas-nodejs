import { Request, Response, NextFunction } from "express";
import { Product, Order } from "./interfaces";

const validateProduct = (product: Product) => {
  if (typeof product.name !== "string" || typeof product.price !== "number") {
    return false;
  }

  return true;
};

export const validateIdIsPresentAndIsInteger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.params.id || Number.isNaN(req.params.id)) {
    return res.status(400);
  }

  next();
};

export const validateOrderRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const order = req.body as Order;

  if (
    !order ||
    typeof order.total_cost !== "number" ||
    typeof order.order_stage !== "string" ||
    typeof order.products !== "object" ||
    order.products.some((product) => {
      typeof product.product_id !== "number" ||
        typeof product.quantity !== "number";
    })
  ) {
    return res.status(400).json({ message: "Invalid Order Data" });
  }

  next();
};

export const validateProductRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const product = req.body as Product;

  if (!product || !validateProduct(product)) {
    return res.status(400).json({ message: "Invalid Product Data" });
  }

  next();
};
