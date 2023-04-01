import { sequelize } from '#app/globals/sequelize.js';
import Category from '#app/models/category.js';
import Tag from '#app/models/tag.js';
import User from '#app/models/user.js';
import Product from '#app/models/product.js';
import Order from '#app/models/order.js';
import OrderProduct from '#app/models/order-product.js';

class Models {
  constructor() {
    this.Category = Category(sequelize, this);
    this.Tag = Tag(sequelize, this);
    this.User = User(sequelize, this);
    this.Order = Order(sequelize, this);
    this.Product = Product(sequelize, this);
    this.OrderProduct = OrderProduct(sequelize, this);

    this.assoc();
  }

  assoc() {
    this.Category.$assoc();
    this.Tag.$assoc();
    this.User.$assoc();
    this.Order.$assoc();
    this.Product.$assoc();
  }
}

const models = new Models();

export const CategoryModel = models.Category;
export const TagModel = models.Tag;
export const UserModel = models.User;
export const ProductModel = models.Product;
export const OrderModel = models.Order;
export const OrderProductModel = models.OrderProduct;
