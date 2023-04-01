import { upload } from '#app/globals/multer.js';
import CheckProductTags from '#app/validators/products/product-tags.js';
import CheckOrderCreate from '#app/validators/orders/create.js';
import CheckCatCreate from '#app/validators/categories/create.js';
import CheckCatUpdate from '#app/validators/categories/update.js';
import CheckTagCreate from '#app/validators/tags/create.js';
import CheckTagUpdate from '#app/validators/tags/update.js';
import * as Tags from '#app/controllers/tags.js';
import * as Cats from '#app/controllers/categories.js';
import * as Products from '#app/controllers/products.js';
import * as Orders from '#app/controllers/orders.js';
import * as Auth from '#app/controllers/auth.js';

export default (app) => {
  app.get('/tags', Tags.list);
  app.get('/tags/:id', Tags.show);
  app.post('/tags', ...CheckTagCreate, Tags.create);
  app.patch('/tags/:id', ...CheckTagUpdate, Tags.update);
  app.delete('/tags/:id', Tags.remove);

  app.get('/categories', Cats.list);
  app.get('/categories/:id', Cats.show);
  app.post('/categories', ...CheckCatCreate, Cats.create);
  app.patch('/categories/:id', ...CheckCatUpdate, Cats.update);
  app.delete('/categories/:id', Cats.remove);

  app.get('/products', Products.list);
  app.get('/products/:id', Products.show);
  app.patch('/products/:id', upload.single('img'), Products.update);
  app.delete('/products/:id', Products.remove);
  app.post('/products', upload.single('img'), Products.create);
  app.post('/products/tags/attach', ...CheckProductTags, Products.attachTags);
  app.post('/products/tags/dettach', ...CheckProductTags, Products.dettachTags);

  app.post('/orders', ...CheckOrderCreate, Orders.create);
  app.get('/orders/:id', Orders.show);
  app.post('/registr', Auth.registr);
  app.post('/login', Auth.login);
}
