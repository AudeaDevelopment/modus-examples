import { Router } from 'express';
import { getSaturationByLLR } from '../../util';

export default new Router()
  .get('/saturation', (req, res, next) => {
    const {
      bookId, lat, lon, rad, API_KEY,
    } = req.query;

    if (bookId && lat && lon && rad) {
      getSaturationByLLR(API_KEY, bookId, lat, lon, rad)
        .then(data => {
          res.json(data);
        })
        .catch(next);
    } else {
      next(4001);
    }
  });
