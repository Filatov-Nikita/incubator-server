import { check } from 'express-validator';
import validate from '#app/middlewares/validate.js';

export default [
  check('name').notEmpty().isString(),
  check('description').optional({ nullable: true }).isString(),
  validate
];
