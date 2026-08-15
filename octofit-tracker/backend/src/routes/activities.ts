import express, { Request, Response } from 'express';
import { Activity } from '../models/Activity.js';

const router = express.Router();

// GET all activities
router.get('/', async (_req: Request, res: Response) => {
  try {
    const activities = await Activity.find().populate('user');
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

// GET activities by user
router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const activities = await Activity.find({ user: req.params.userId });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

// POST create activity
router.post('/', async (req: Request, res: Response) => {
  try {
    const { user, type, duration, distance, calories, date } = req.body;
    const activity = new Activity({ user, type, duration, distance, calories, date });
    await activity.save();
    res.status(201).json(activity);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create activity' });
  }
});

// PUT update activity
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!activity) {
      res.status(404).json({ error: 'Activity not found' });
      return;
    }
    res.json(activity);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update activity' });
  }
});

// DELETE activity
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    if (!activity) {
      res.status(404).json({ error: 'Activity not found' });
      return;
    }
    res.json({ message: 'Activity deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete activity' });
  }
});

export default router;
