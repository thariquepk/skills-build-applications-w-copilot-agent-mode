import express, { type ErrorRequestHandler } from 'express';
import mongoose from 'mongoose';
import { apiRouter } from './routes.js';

const port = 8000;
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

export const app = express();

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  if (request.method === 'OPTIONS') {
    response.sendStatus(204);
    return;
  }
  next();
});
app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', database: mongoose.connection.readyState === 1 });
});
app.use('/api', apiRouter);

const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  console.error('API request failed:', error);
  response.status(500).json({ error: 'Internal server error' });
};
app.use(errorHandler);

mongoose
  .connect(connectionString)
  .then(() => console.log('Connected to octofit_db'))
  .catch((error: unknown) => console.error('Unable to connect to octofit_db:', error));

app.listen(port, () => {
  console.log(`OctoFit Tracker API listening at ${baseUrl}`);
});
