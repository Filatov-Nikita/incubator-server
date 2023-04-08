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
import * as Reports from '#app/controllers/reports.js';
import AuthMid from '#app/middlewares/auth.js';


export default (app) => {
  app.get('/tags', AuthMid, Tags.list);
  app.get('/tags/:id', AuthMid, Tags.show);
  app.post('/tags', AuthMid, ...CheckTagCreate, Tags.create);
  app.patch('/tags/:id', AuthMid, ...CheckTagUpdate, Tags.update);
  app.delete('/tags/:id', AuthMid, Tags.remove);

  app.get('/categories', AuthMid, Cats.list);
  app.get('/categories/:id', AuthMid, Cats.show);
  app.post('/categories', AuthMid, ...CheckCatCreate, Cats.create);
  app.patch('/categories/:id', AuthMid, ...CheckCatUpdate, Cats.update);
  app.delete('/categories/:id', AuthMid, Cats.remove);

  app.get('/products', AuthMid, Products.list);
  app.get('/products/:id', AuthMid, Products.show);
  app.patch('/products/:id', AuthMid, upload.single('img'), Products.update);
  app.delete('/products/:id', AuthMid, Products.remove);
  app.post('/products', AuthMid, upload.single('img'), Products.create);
  app.post('/products/tags/attach', AuthMid, ...CheckProductTags, Products.attachTags);
  app.post('/products/tags/dettach', AuthMid, ...CheckProductTags, Products.dettachTags);

  app.post('/orders', AuthMid, ...CheckOrderCreate, Orders.create);
  app.get('/orders/:id', AuthMid, Orders.show);
  app.get('/orders', AuthMid, Orders.list);

  app.get('/reports/total_products', AuthMid, Reports.totalProducts);

  app.post('/registr', Auth.registr);
  app.post('/login', Auth.login);
}
