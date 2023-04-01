import { DataTypes } from 'sequelize';

export default (sequlize, models) => {
  const Category = sequlize.define('category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
  });

  Category.$assoc = () => {
    Category.hasMany(models.Product, {
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });

    Category.hasMany(models.Tag, {
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });
  }

  return Category;
}
