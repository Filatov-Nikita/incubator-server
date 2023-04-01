import { OrderModel, ProductModel, UserModel } from '#app/globals/models.js';

function createMap(list, pk) {
  if(!Array.isArray(list)) throw new Error();
  if(typeof pk !== 'number' && typeof pk !== 'string') throw new Error();

  return list.reduce((acc, obj) => {
    if(!obj) throw new Error();
    const key = obj[pk];
    if(typeof key !== 'number' && typeof key !== 'string') throw new Error();
    acc[obj[pk]] = obj;
    return acc;
  }, {});
}

export async function create(req, res, next) {
  try {
    let { products } = req.body;

    const productsMap = createMap(products, 'id');

    const user = await UserModel.findByPk(10);

    if(user === null) return res.status(404).end('Пользователь не найден');

    const order = await user.createOrder({});

    const productsList = await ProductModel.findAll({
      where: {
        id: products.map(product => product.id)
      },
    });

    productsList.forEach(product => {
      product.OrderProduct = {
        productPrice: product.price,
        productCount: productsMap[product.id].count
      }

      return product;
    });

    await order.addProducts(productsList);

    const result = await OrderModel.findOne({
      where: { id: order.id },
      include: ProductModel
    })

    res.json(result);
  } catch(e) {
    next(e);
  }
}

export async function show(req, res, next) {
  try {
    const id = req.params.id;

    const order = await OrderModel.findOne({
      where: { id },
      include: ProductModel
     });

    res.json(order);
  } catch(e) {
    next(e);
  }
}
