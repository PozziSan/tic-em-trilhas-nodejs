import { Request, Response, Router } from "express";
import { validateProductRequest } from "../middlewares";
import Product from "../models/Product";

export const productRouter = Router();

productRouter.post(
  "/products",
  validateProductRequest,
  async (req: Request, res: Response) => {
    const newProduct = req.body;

    try {
      const product = await Product.create(newProduct);

      return res.status(201).json(product);
    } catch (error) {
      console.log("Error while creating the Product: ", error);

      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

productRouter.get("/products/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const product = await Product.findByPk(id);

    if (!product) {
      return res
        .status(404)
        .json({ message: `Product of Id: ${id} was not found` });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.log("Error while querying for product: ", error);

    return res.status(500).json({ message: "Internal Server Error" });
  }
});

productRouter.get("/products", async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll();

    return res.status(200).json(products);
  } catch (error) {
    console.log("Error while querying for products: ", error);

    return res.status(500).json({ message: "Internal Server Error" });
  }
});
