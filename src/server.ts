import * as dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import cors from 'cors';

const port = process.env.PORT || 4000;
const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.json({ message: 'v' });
});

app.use((err: Error, _req: Request, res: Response, next) => {
  return res.status(400).send({ err: err.message ? err.message : JSON.stringify(err) });
});

app.listen(Number(port), '0.0.0.0',  () => console.log('listening on port ' + port));

