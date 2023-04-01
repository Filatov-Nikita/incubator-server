import { check } from 'express-validator';
import validate from '#app/middlewares/validate.js';

export default [
  check('products.*.id').isInt(),
  check('products.*.count').isInt(),
  validate
];
