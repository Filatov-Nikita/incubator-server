import { CategoryModel } from '#app/globals/models.js';
import NotFound from '#app/errors/NotFound.js';

export async function list(req, res, next) {
  try {
    const cats = await CategoryModel.findAll();
    res.json(cats);
  } catch(e) {
    next(e);
  }
}

export async function show(req, res, next) {
  try {
    const { id } = req.params;

    const cat = await CategoryModel.findByPk(id);

    if(cat === null) throw new NotFound();

    res.json(cat);
  } catch(e) {
    next(e);
  }
}

export async function create(req, res, next) {
  try {
    const { name, description = null } = req.body;
    const cats = await CategoryModel.create({ name, description });
    res.json(cats);
  } catch(e) {
    next(e);
  }
}

export async function update(req, res, next) {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    await CategoryModel.update(
      { name, description }, { where: { id } }
    );

    const cat = await CategoryModel.findByPk(id);

    if(cat === null) throw new NotFound();

    res.json(cat);
  } catch(e) {
    next(e);
  }
}

export async function remove(req, res, next) {
  try {
    const { id } = req.params;
    await CategoryModel.destroy({ where: { id } });
    res.json(true);
  } catch(e) {
    next(e);
  }
}
