import express, { Request, Response } from 'express';
import { Leaderboard } from '../models/Leaderboard.js';

const router = express.Router();

// GET leaderboard (sorted by points)
router.get('/', async (_req: Request, res: Response) => {
  try {
    const leaderboard = await Leaderboard.find()
      .populate('user')
      .populate('team')
      .sort({ points: -1 });
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// GET leaderboard by team
router.get('/team/:teamId', async (req: Request, res: Response) => {
  try {
    const leaderboard = await Leaderboard.find({ team: req.params.teamId })
      .populate('user')
      .sort({ points: -1 });
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team leaderboard' });
  }
});

// GET user rank
router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const rank = await Leaderboard.findOne({ user: req.params.userId }).populate('user');
    if (!rank) {
      res.status(404).json({ error: 'User not on leaderboard' });
      return;
    }
    res.json(rank);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user rank' });
  }
});

// PUT update leaderboard entry
router.put('/:userId', async (req: Request, res: Response) => {
  try {
    const { points, rank, team } = req.body;
    const entry = await Leaderboard.findOneAndUpdate(
      { user: req.params.userId },
      { points, rank, team },
      { new: true, upsert: true }
    );
    res.json(entry);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update leaderboard' });
  }
});

export default router;
