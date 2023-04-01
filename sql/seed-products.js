import { ProductModel } from '#app/globals/models.js';

const array = Array(1000).fill(
  {
    name: 'Бройлер',
    price: 100,
    categoryId: 2,
    visible: true
  }, 0, 1000
)
await ProductModel.bulkCreate(array);
