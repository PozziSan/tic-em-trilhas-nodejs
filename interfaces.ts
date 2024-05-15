interface Product {
  price: Number;
  name: String;
}

interface ProductOrder {
  product_id: Number;
  quantity: Number;
}

interface Order {
  total_cost: Number;
  order_stage: String;
  products: ProductOrder[];
}

export { Order, Product, ProductOrder };
