import { ProductModel, OrderProductModel } from '#app/globals/models.js';
import { Op, Sequelize } from 'sequelize';

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

    const list = await OrderProductModel.findAll({
      group: [ 'productId', 'productPrice' ],
      attributes: [
        [ 'productId', 'productId' ],
        [ 'productPrice', 'productPrice' ],
        [Sequelize.fn('sum', Sequelize.col('productCount')), 'count'],
      ],
      where,
    });

    const products = await ProductModel.findAll({
      where: {
        id: list.map(i => i.productId)
      },
      attributes: [
        ['id', 'id'],
        ['name', 'name'],
      ]
    });

    const resposne = list.map(({ dataValues }, index) => {
      return {
        ...dataValues,
        product: products[index],
        totalSum: dataValues.count * dataValues.productPrice
      }
    })

    res.json(resposne);
  } catch(e) {
    next(e);
  }
}
