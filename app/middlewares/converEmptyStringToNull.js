export default function (req, res, next) {
  if(req.get('Content-Type') === 'application/json' && req.body) {
    for(let key in req.body) {
      if(req.body[key] === '') {
        req.body[key] = null;
      }
    }
  }
  next();
}
