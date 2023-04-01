export default (sequlize, models) => {
  const Order = sequlize.define('order', {});

  Order.$assoc = () => {
    Order.belongsTo(models.User);
    Order.belongsToMany(models.Product, { through: models.OrderProduct });
  }

  return Order;
}
