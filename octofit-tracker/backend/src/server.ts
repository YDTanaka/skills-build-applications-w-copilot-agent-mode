import express from 'express';
import dotenv from 'dotenv';
import db from './config/database.js';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 8000);

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-backend' });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`OctoFit backend listening on http://localhost:${port}`);
});

export default app;
export { db };
