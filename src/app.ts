import * as express from 'express';
const app = express();
const port = 3000;

app.get('/', (req:express.Request, res:express.Response) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});


