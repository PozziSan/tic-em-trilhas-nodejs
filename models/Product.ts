import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
} from "sequelize-typescript";
import Order from "./Order";
import ProductOrder from "./ProductOrder";

@Table({ modelName: "product", timestamps: true })
export default class Product extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true })
  id?: number;

  @Column(DataType.DOUBLE)
  price!: Number;

  @Column(DataType.STRING)
  name!: String;

  @BelongsToMany(() => Order, () => ProductOrder)
  orders?: Order[];
}
