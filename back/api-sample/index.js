import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import books from './routes/books';
import saturation from './routes/saturation';
import score from './routes/score';
import errorHandler from './middleware/errorHandler';

require('dotenv').config();

const PORT = process.env.PORT || 4321;
const app = express();

const corsOptions = {
  origin: ['*'],
};

app
  .use(cors(corsOptions))
  .use(bodyParser.json())
  .use(books)
  .use(saturation)
  .use(score)
  .use(errorHandler)
  .listen(PORT, () => console.log(`Server up on ${PORT}\n`));
