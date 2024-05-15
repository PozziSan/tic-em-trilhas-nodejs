import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
} from "sequelize-typescript";
import Product from "./Product";
import ProductOrder from "./ProductOrder";

import { Order as OrderInterface } from "../interfaces";

@Table({ tableName: "order", timestamps: true })
export default class Order extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true })
  id?: number;

  @Column(DataType.DOUBLE)
  total_cost!: Number;

  @Column(DataType.STRING)
  order_stage!: String;

  @BelongsToMany(() => Product, () => ProductOrder)
  products?: Product[];

  static async createOrder(newOrder: OrderInterface): Promise<Order> {
    const { total_cost, order_stage } = newOrder;
    const order = await this.create({ total_cost, order_stage });
    await ProductOrder.bulkCreateProductOrder(
      newOrder.products,
      order.id as number
    );

    return order;
  }
}
