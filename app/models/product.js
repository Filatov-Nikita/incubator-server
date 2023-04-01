import { DataTypes } from 'sequelize';

export default (sequlize, models) => {
  const Product = sequlize.define('product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true
    },
    price: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    visible: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  });

  Product.$assoc = () => {
    Product.belongsTo(models.Category);
    Product.belongsToMany(models.Tag, { through: 'TagProduct' });
    Product.belongsToMany(models.Order, { through: models.OrderProduct });
  }

  return Product;
}
