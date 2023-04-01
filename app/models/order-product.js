import { DataTypes } from 'sequelize';

export default (sequlize, models) => {
  const OrderProduct = sequlize.define('OrderProduct', {
    orderId: {
      type: DataTypes.INTEGER,
      references: {
        model: models.Order,
        key: 'id'
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    },
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: models.Product,
        key: 'id'
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    },
    productCount: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    productPrice: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    }
  });

  return OrderProduct;
}
