import { UserModel } from '#app/globals/models.js';

await UserModel.bulkCreate([
  { name: 'Аделя', email: 'adelya0712@gmail.com', password: '1' },
  { name: 'Наташа', email: '1@1.ru', password: '1' },
]);
