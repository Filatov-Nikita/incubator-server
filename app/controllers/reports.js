import { ProductModel, OrderProductModel } from '#app/globals/models.js';
import { sequelize } from '#app/globals/sequelize.js';
import { Op, Sequelize, QueryTypes } from 'sequelize';

export async function totalProducts(req, res, next) {
  try {
    const where = {};
    const { dateFrom, dateTo } = req.query;

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

    const list = await sequelize.query(`
      SELECT products.id, products.name, OrderProducts.productPrice,
      SUM(productCount) as count, SUM(productCount * productPrice) as totalSum
      from OrderProducts JOIN products on OrderProducts.productId = products.id
      GROUP BY productId, productPrice
    `, { type: QueryTypes.SELECT });

    const resposne = list.map(el => ({
      product: { id: el.id, name: el.name },
      totalSum: el.totalSum,
      productPrice: el.productPrice,
      count: el.count
    }))

    res.json(resposne);
  } catch(e) {
    next(e);
  }
}
