import { Op } from 'sequelize';
import { ProductModel, TagModel } from '#app/globals/models.js';
import { publicUrl } from '#app/core/upload.js';
import NotFound from '#app/errors/NotFound.js';

export async function list(req, res, next) {
  try {
    const and = Op.and;
    const tags = req.query.tags;
    const opts = {};
    const where = { [and]: [] };

    const { categoryId, offset, limit } = req.query;
    if(limit) opts.limit = +limit;
    if(offset) opts.offset = +offset;
    if(categoryId) where[and].push({ categoryId });
    if('visible' in req.query) where[and].push({ visible: true });

    if('withTags' in req.query) opts.include = TagModel;
    if(tags) opts.include = [
      {
        model: TagModel,
        where: { id: tags },
      }
    ];

    const { count, rows: products } = await ProductModel.findAndCountAll({
      where,
      order: [ ['visible', 'DESC'], ['createdAt', 'DESC'] ],
      ...opts
    });

    res.json({
      data: products,
      meta: {
        limit: opts.limit,
        offset: opts.offset,
        total: count,
      }
    });
  } catch(e) {
    next(e);
  }
}

export async function show(req, res, next) {
  try {
    const id = req.params.id;
    const product = await ProductModel.findOne({ where: { id } });
    if(product === null) throw new NotFound();
    res.json(product);
  } catch(e) {
    next(e);
  }
}

export async function create(req, res, next) {
  try {
    const img = req.file ? publicUrl(req.file) : req.body.img || null;
    const { name, price, description = null, categoryId = null, visible = true } = req.body;
    const product = await ProductModel.create({
      img,
      name,
      price,
      description,
      categoryId,
      visible
    });

    res.json(await ProductModel.findByPk(product.id, {
      include: TagModel
    }));
  } catch(e) {
    next(e)
  }
}

export async function update(req, res, next) {
  try {
    const id = req.params.id;

    let img;
    if(req.file !== undefined || req.body.img !== undefined) {
      img = req.file ? publicUrl(req.file) : req.body.img || null;
    }

    const { name, price, description, categoryId, visible } = req.body;
    await ProductModel.update(
      {
        img,
        name,
        price,
        description,
        categoryId,
        visible
      },
      { where: { id } }
    );


    const product = await ProductModel.findOne({ where: { id } });

    if(product === null) throw new NotFound();

    res.json(product);
  } catch(e) {
    next(e);
  }
}

export async function remove(req, res, next) {
  try {
    const id = req.params.id;
    await ProductModel.destroy({ where: { id } });
    res.json(true);
  } catch(e) {
    next(e);
  }
}


export async function attachTags(req, res, next) {
  try {
    const { productId, tags } = req.body;

    const product = await ProductModel.findByPk(productId);

    if(product === null) throw new NotFound();

    const { count, rows: rowsTags } = await TagModel.findAndCountAll({ where: { id: tags } });

    if(count !== tags.length) {
      const ids = rowsTags.map(row => row.id);
      for(const tag of tags) {
        if(!ids.includes(tag)) return res.status(422).end(`тега ${tag} не существует`);
      }
    }

    await product.addTags(tags);

    const newProduct = await ProductModel.findOne({
      where: { id: product.id },
      include: TagModel
    });

    res.json(newProduct);

  } catch(e) {
    next(e);
  }
}

export async function dettachTags(req, res, next) {
  try {
    const { productId, tags } = req.body;

    const product = await ProductModel.findByPk(productId);

    if(product === null) throw new NotFound();

    await product.removeTags(tags);

    const newProduct = await ProductModel.findOne({
      where: { id: product.id },
      include: TagModel
    });

    res.json(newProduct);
  } catch {
    next(e);
  }
}
