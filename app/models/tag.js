import { DataTypes } from 'sequelize';


export default (sequelize, models) => {
  const Tag = sequelize.define('tag', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    visible: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'purple'
    }
  });

  Tag.$assoc = () => {
    Tag.belongsTo(models.Category);
    Tag.belongsToMany(models.Product, { through: 'TagProduct' });
  }

  return Tag;
}
