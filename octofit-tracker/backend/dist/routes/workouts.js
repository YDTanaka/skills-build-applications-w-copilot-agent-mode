import express from 'express';
import { Workout } from '../models/Workout.js';
const router = express.Router();
// GET all workouts
router.get('/', async (_req, res) => {
    try {
        const workouts = await Workout.find();
        res.json(workouts);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch workouts' });
    }
});
// GET workout by ID
router.get('/:id', async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id).populate('suggestedFor');
        if (!workout) {
            res.status(404).json({ error: 'Workout not found' });
            return;
        }
        res.json(workout);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch workout' });
    }
});
// GET workouts by difficulty
router.get('/difficulty/:difficulty', async (req, res) => {
    try {
        const workouts = await Workout.find({ difficulty: req.params.difficulty });
        res.json(workouts);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch workouts' });
    }
});
// POST create workout
router.post('/', async (req, res) => {
    try {
        const { name, description, difficulty, duration, suggestedFor } = req.body;
        const workout = new Workout({ name, description, difficulty, duration, suggestedFor });
        await workout.save();
        res.status(201).json(workout);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create workout' });
    }
});
// PUT update workout
router.put('/:id', async (req, res) => {
    try {
        const workout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!workout) {
            res.status(404).json({ error: 'Workout not found' });
            return;
        }
        res.json(workout);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to update workout' });
    }
});
// DELETE workout
router.delete('/:id', async (req, res) => {
    try {
        const workout = await Workout.findByIdAndDelete(req.params.id);
        if (!workout) {
            res.status(404).json({ error: 'Workout not found' });
            return;
        }
        res.json({ message: 'Workout deleted' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete workout' });
    }
});
export default router;
