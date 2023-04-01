import './app/config/index.js';
import express from 'express';
import { PORT } from './app/config/app.js';
import routes from './app/routes/index.js';
import { ValidationError } from 'sequelize';
import NotFound from '#app/errors/NotFound.js';
import converEmptyStringToNull from '#app/middlewares/converEmptyStringToNull.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.static('./public'));
app.use('/uploads', express.static('./uploads'));
app.use(express.json());
app.use(converEmptyStringToNull);
app.use(express.urlencoded({ extended: true }));

routes(app);

app.use(function (e, req, res, next) {
  if(e instanceof ValidationError) {
    res.status(422).json(e.errors.map(i => i.message));
  } else if(e instanceof NotFound) {
    res.status(404).end('Запрашиваемый ресурс не найден');
  } else {
    console.error(e);
    res.status(500).end('Произошла ошибка на сервере');
    next();
  }
});

app.listen(PORT);
