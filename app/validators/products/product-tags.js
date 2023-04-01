import { check } from 'express-validator';
import validate from '#app/middlewares/validate.js';

export default [
  check('productId').isInt(),
  check('tags.*').isInt(),
  validate
];
