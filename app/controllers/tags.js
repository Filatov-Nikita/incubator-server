import { TagModel, CategoryModel } from '#app/globals/models.js';
import NotFound from '#app/errors/NotFound.js';

export async function list(req, res, next) {
  try {
    const where = {};
    const { categoryId } = req.query;
    if(categoryId) where.categoryId = categoryId;
    const tags = await TagModel.findAll({ where });
    res.json(tags);
  } catch(e) {
    next(e);
  }
}

export async function show(req, res, next) {
  try {
    const { id } = req.params;

    const cat = await TagModel.findByPk(id);

    if(cat === null) throw new NotFound();

    res.json(cat);
  } catch(e) {
    next(e);
  }
}

export async function update(req, res, next) {
  try {
    const { id } = req.params;
    const { name, color, categoryId, visible } = req.body;

    if(categoryId) {
      const cat = await CategoryModel.findByPk(categoryId);
      if(cat === null) return res.status(422).json(`categoryId: ${categoryId} не существует`);
    }

    const rows = await TagModel.update(
      { name, color, categoryId, visible }, { where: { id } }
    );

    if(rows[0] === 0) throw new NotFound();

    const tag = await TagModel.findByPk(id);

    res.json(tag);
  } catch(e) {
    next(e);
  }
}

export async function create(req, res, next) {
  try {
    const { name, color, categoryId, visible } = req.body;

    const cat = await CategoryModel.findByPk(categoryId);

    if(cat === null) return res.status(422).json(`categoryId: ${categoryId} не существует`);

    const tag = await TagModel.create({
      name,
      color,
      visible,
      categoryId,
    });

    res.json(tag);
  } catch(e) {
    next(e);
  }
}

export async function remove(req, res, next) {
  try {
    const { id } = req.params;
    await TagModel.destroy({ where: { id } });
    res.json(true);
  } catch(e) {
    next(e);
  }
}
