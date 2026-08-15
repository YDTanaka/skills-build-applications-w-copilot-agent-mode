import express from 'express';
import { User } from '../models/User.js';
const router = express.Router();
// GET all users
router.get('/', async (_req, res) => {
    try {
        const users = await User.find().populate('team');
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});
// GET user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('team');
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});
// POST create user
router.post('/', async (req, res) => {
    try {
        const { name, email, password, team } = req.body;
        const user = new User({ name, email, password, team });
        await user.save();
        res.status(201).json(user);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create user' });
    }
});
// PUT update user
router.put('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.json(user);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to update user' });
    }
});
// DELETE user
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.json({ message: 'User deleted' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
});
export default router;
