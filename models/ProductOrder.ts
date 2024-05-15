import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from "sequelize-typescript";
import Order from "./Order";
import Product from "./Product";

@Table({ modelName: "product_order", timestamps: true })
export default class ProductOrder extends Model {
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
}
