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
  check('name').optional().notEmpty().isString(),
  check('color').optional().notEmpty().isIn(colorList),
  check('visible').optional().isBoolean(),
  check('categoryId').optional().isInt(),
  validate
];
