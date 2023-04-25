import { ProductModel, CategoryModel } from '#app/globals/models.js';

const cat = await CategoryModel.findOrCreate({
  where: { name: 'Птица' }
})

const array = Array(100).fill(
  {
    price: 100,
    categoryId: cat.id,
    visible: true
  }, 0, 100
).map((e, i) => ({
  ...e,
  name: 'Бройлер ' + (i + 1)
}));

await ProductModel.bulkCreate(array);
