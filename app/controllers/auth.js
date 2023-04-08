import { UserModel } from '#app/globals/models.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const failedAuthMsg = 'Неправильный логин или пароль';

export async function registr(req, res, next) {
  try {
    const { email, password } = req.body;

    const hash = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      email,
      password: hash
    });

    return res.json({ id: user.id, email: user.email });
  } catch(e) {
    next(e);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ where: { email } });

    if(user === null) return res.status(400).end(failedAuthMsg);

    const result = await bcrypt.compare(password, user.password);

    if(!result) return res.status(400).end(failedAuthMsg);

    const payload = { id: user.id, email: user.email, name: user.name };

    if(!process.env.JWT_SECRET) throw new Error();

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 * 365 });

    res.json({ token });
  } catch(e) {
    next(e);
  }
}
