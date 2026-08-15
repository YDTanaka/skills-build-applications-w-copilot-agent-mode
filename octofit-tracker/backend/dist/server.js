import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './config/database.js';
import usersRouter from './routes/users.js';
import teamsRouter from './routes/teams.js';
import activitiesRouter from './routes/activities.js';
import leaderboardRouter from './routes/leaderboard.js';
import workoutsRouter from './routes/workouts.js';
dotenv.config();
const app = express();
const port = Number(process.env.PORT || 8000);
// Codespaces-aware API URL
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
const allowedOrigins = [
    `https://${codespaceName}-5173.app.github.dev`,
    'http://localhost:5173',
    'http://127.0.0.1:5173',
].filter(Boolean);
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
            return;
        }
        callback(new Error(`Origin ${origin} is not allowed by CORS`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
// Health check endpoint
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-backend', baseUrl });
});
// API routes
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);
app.listen(port, '0.0.0.0', () => {
    console.log(`OctoFit backend listening on ${baseUrl}`);
    console.log('API endpoints available at:');
    console.log(`  - ${baseUrl}/api/users`);
    console.log(`  - ${baseUrl}/api/teams`);
    console.log(`  - ${baseUrl}/api/activities`);
    console.log(`  - ${baseUrl}/api/leaderboard`);
    console.log(`  - ${baseUrl}/api/workouts`);
});
export default app;
export { db };
