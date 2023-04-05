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
      group: [ 'productId' ],
      attributes: [
        [ 'productId', 'productId' ],
        [Sequelize.fn('sum', Sequelize.col('productCount')), 'count'],
        [Sequelize.fn('sum', Sequelize.col('productPrice')), 'totalSum'],
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

    const resposne = list.map((item, index) => {
      return {
        ...item.dataValues,
        product: products[index]
      }
    })

    res.json(resposne);
  } catch(e) {
    next(e);
  }
}
