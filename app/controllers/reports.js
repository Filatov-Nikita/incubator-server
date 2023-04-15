import { ProductModel, OrderProductModel, OrderModel } from '#app/globals/models.js';
import { sequelize } from '#app/globals/sequelize.js';
import { Op } from 'sequelize';

export async function totalProducts(req, res, next) {
  try {
    const where = {};
    const productWhere = {};
    const { dateFrom, dateTo, categoryId } = req.query;

    if(categoryId) {
      productWhere.categoryId = categoryId;
    }

    if(dateFrom) {
      if(!where.createdAt) where.createdAt = {};
      where.createdAt[Op.gte] = new Date(dateFrom);
    }

    if(dateTo) {
      if(!where.createdAt) where.createdAt = {};
      const dt = new Date(dateTo);
      dt.setDate(dt.getDate() + 1);
      where.createdAt[Op.lt] = dt;
    }

    const list = await OrderModel.findAll({
      attributes: [
        [sequelize.col('products.name'), 'name'],
        [sequelize.col('products.id'), 'productId'],
        [sequelize.col('products.OrderProduct.productPrice'), 'price'],
        [sequelize.fn('sum', sequelize.col('products.OrderProduct.productCount')), 'count'],
      ],
      include: {
        model: ProductModel,
        attributes: [],
        where: productWhere,
        through: {
          attributes: []
        }
      },
      where,
      raw: true,
      group: [ sequelize.col('products.OrderProduct.productId'), sequelize.col('products.OrderProduct.productPrice') ]
    });

    let total = 0;
    list.forEach(item => {
      const { price, count } = item;
      item.total = price * count
      total += item.total
    });

    const resposne = list.map(el => ({
      product: { id: el.productId, name: el.name },
      totalSum: el.total,
      productPrice: el.price,
      count: el.count
    }))

    res.json({
      products: resposne,
      total
    });
  } catch(e) {
    next(e);
  }
}
