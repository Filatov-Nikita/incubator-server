import jwt from 'jsonwebtoken';

function finishWithError(res) {
  res.status(401).json('Нет авторизации');
}

export default async function auth(req, res, next) {
  const { token } = req.headers;

  if(!token) {
    return finishWithError(res);
  }

  if(!process.env.JWT_SECRET) return next(new Error());

  try {
    const { id, email, name } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id, email, name };
    next();
  } catch(e) {
    finishWithError(res);
  }
}
