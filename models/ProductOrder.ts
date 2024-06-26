import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  AutoIncrement,
} from "sequelize-typescript";
import Order from "./Order";
import Product from "./Product";

import { ProductOrder as ProductOrderInterface } from "../interfaces";
import { Op } from "sequelize";

interface QuantityByProductId {
  [key: number]: number;
}

@Table({ modelName: "product_order", timestamps: true })
export default class ProductOrder extends Model {
  @AutoIncrement
  @Column({ type: DataType.INTEGER, primaryKey: true })
  id?: number;

  @Column(DataType.DOUBLE)
  price!: Number;

  @Column(DataType.DOUBLE)
  quantity!: Number;

  @ForeignKey(() => Order)
  order_id!: Number;

  @ForeignKey(() => Product)
  product_id!: Number;

  static async bulkCreateProductOrder(
    newProductOrders: ProductOrderInterface[],
    orderId: Number
  ) {
    const productIds = newProductOrders.map((product) => product.product_id);
    const products = await Product.findAll({
      where: { id: { [Op.in]: productIds } },
    });

    if (products.length !== productIds.length) {
      throw new Error("Some Product was not Found");
    }

    const quantityByProductId: QuantityByProductId = newProductOrders
      .map((po) => {
        return {
          [po.product_id as number]: po.quantity,
        } as QuantityByProductId;
      })
      .reduce((accumulator, quantityByProductId) => {
        return { ...accumulator, ...quantityByProductId };
      });

    const bulkPayload = products.map((product) => {
      return {
        product_id: product.id,
        order_id: orderId,
        quantity: quantityByProductId[product.id as number],
      };
    });

    return await ProductOrder.bulkCreate(bulkPayload);
  }
}
