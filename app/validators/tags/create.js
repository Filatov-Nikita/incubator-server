import { check } from 'express-validator';
import validate from '#app/middlewares/validate.js';

const colorList = [
  'purple',
  'orange',
  'blue',
  'red',
  'green',
  'black'
]

export default [
  check('name').notEmpty().isString(),
  check('color').notEmpty().isIn(colorList),
  check('visible').isBoolean(),
  check('categoryId').isInt(),
  validate
];
