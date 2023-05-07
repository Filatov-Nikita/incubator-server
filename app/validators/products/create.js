import { check } from 'express-validator';
import { Multer } from 'multer';
import validate from '#app/middlewares/validate.js';

function isValidImage(value, { req }) {
  const img = req.img ?? null;
  if(img === null) return true;
  if(typeof img === 'string') return true;
  if(typeof img.mimetype !== 'string') return false;
  if(img.mimetype.startWith('image/')) return
}

export default [
  check('name').notEmpty(),
  check('price').isNumeric(),
  check('description'),
  check('categoryId').isInt(),
  check('visible').isBoolean(),
  check('img').custom(isValidImage),
  validate
];
