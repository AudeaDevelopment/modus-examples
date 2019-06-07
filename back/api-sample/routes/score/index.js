import { Router } from 'express';
import { getGisScoreByLL, getGisScoresByBB } from '../../util';

export default new Router()
  .get('/score', (req, res, next) => {
    const {
      bounds, lat, lon, API_KEY,
    } = req.query;

    if (API_KEY !== process.env.HIPPO) {
      return next(4011);
    }
    if (lat && lon) {
      getGisScoreByLL(lat, lon)
        .then(({ body }) => {
          const { data: scores } = body;
          if (scores.length) {
            const [
              {
                __id: id,
                data: { gia_score: score },
              },
            ] = scores;
            return res.json({ score, id });
          }
          res.statusMessage = 'no results found';
          res.status(200).end();
        })
        .catch(() => next(4012));
    } else if (bounds) {
      getGisScoresByBB(...bounds.split(','))
        .then(data => {
          if (data.body.data.length) {
            return res.send(JSON.stringify(data.body.data));
          }
          res.statusMessage = 'no results found';
          res.status(200).end();
        })
        .catch(() => next(4012));
    } else {
      next(4001);
    }
  });
