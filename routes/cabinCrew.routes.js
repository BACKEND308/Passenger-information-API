import express from 'express';
import CabinCrew from '../models/CabinCrew.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const cabinCrew = await CabinCrew.find();
    res.json(cabinCrew);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const cabinCrewMember = await CabinCrew.findById(req.params.id);
    if (!cabinCrewMember) {
      return res.status(404).json({ error: 'Cabin crew member not found' });
    }
    res.json(cabinCrewMember);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const cabinCrewMember = new CabinCrew(req.body);
    await cabinCrewMember.save();
    res.status(201).json(cabinCrewMember);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const cabinCrewMember = await CabinCrew.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!cabinCrewMember) {
      return res.status(404).json({ error: 'Cabin crew member not found' });
    }
    res.json(cabinCrewMember);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const cabinCrewMember = await CabinCrew.findByIdAndDelete(req.params.id);
    if (!cabinCrewMember) {
      return res.status(404).json({ error: 'Cabin crew member not found' });
    }
    res.json({ message: 'Cabin crew member deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
