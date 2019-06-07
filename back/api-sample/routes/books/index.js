import { Router } from 'express';
import { getBooks } from '../../util';

export default new Router()
  .get('/books', (req, res, next) => {
    getBooks(req.query.API_KEY)
      .then(data => {
        res.json(data);
      })
      .catch(() => next(4011));
  });
