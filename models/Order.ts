import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
} from "sequelize-typescript";
import Product from "./Product";
import ProductOrder from "./ProductOrder";

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
}
