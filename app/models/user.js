import { DataTypes } from 'sequelize';

export default (sequlize, models) => {
  const User = sequlize.define('user', {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  User.$assoc = () => {
    User.hasMany(models.Order, {
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
  }

  return User;
}
