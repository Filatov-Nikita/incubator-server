import { CategoryModel } from '#app/globals/models.js';

await CategoryModel.bulkCreate([
  { name: 'Птица' },
  { name: 'Корм' },
  { name: 'Другие товары' },
]);
