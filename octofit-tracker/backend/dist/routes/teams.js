import express from 'express';
import { Team } from '../models/Team.js';
const router = express.Router();
// GET all teams
router.get('/', async (_req, res) => {
    try {
        const teams = await Team.find().populate('members');
        res.json(teams);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch teams' });
    }
});
// GET team by ID
router.get('/:id', async (req, res) => {
    try {
        const team = await Team.findById(req.params.id).populate('members');
        if (!team) {
            res.status(404).json({ error: 'Team not found' });
            return;
        }
        res.json(team);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch team' });
    }
});
// POST create team
router.post('/', async (req, res) => {
    try {
        const { name, description, members } = req.body;
        const team = new Team({ name, description, members });
        await team.save();
        res.status(201).json(team);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create team' });
    }
});
// PUT update team
router.put('/:id', async (req, res) => {
    try {
        const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!team) {
            res.status(404).json({ error: 'Team not found' });
            return;
        }
        res.json(team);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to update team' });
    }
});
// DELETE team
router.delete('/:id', async (req, res) => {
    try {
        const team = await Team.findByIdAndDelete(req.params.id);
        if (!team) {
            res.status(404).json({ error: 'Team not found' });
            return;
        }
        res.json({ message: 'Team deleted' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete team' });
    }
});
export default router;
