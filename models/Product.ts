import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
  AutoIncrement,
  Unique,
} from "sequelize-typescript";
import Order from "./Order";
import ProductOrder from "./ProductOrder";
import { Product as ProductInterface } from "../interfaces";

@Table({ modelName: "product", timestamps: true })
export default class Product extends Model {
  @AutoIncrement
  @Column({ type: DataType.INTEGER, primaryKey: true })
  id?: number;

  @Column(DataType.DOUBLE)
  price!: Number;

  @Unique
  @Column(DataType.STRING)
  name!: String;

  @BelongsToMany(() => Order, () => ProductOrder)
  orders?: Order[];

  static async updateProductById(
    productId: number,
    productData: ProductInterface
  ): Promise<Product | null> {
    const product = await Product.findByPk(productId);

    if (!product) {
      return null;
    }

    product.update(productData);
    product.save();

    return product;
  }
}
