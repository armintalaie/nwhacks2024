import express, { Request, Response } from 'express';
import mongoose from '../database'; // Import the MongoDB connection
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

const goalSchema = new mongoose.Schema({
  goalid: { type: mongoose.Schema.Types.String, default: uuidv4 },
  userA: { type: mongoose.Schema.Types.String, required: true },
  userB: { type: mongoose.Schema.Types.String, required: true },
  userAGoal: { type: mongoose.Schema.Types.String, required: true },
  userBGoal: { type: mongoose.Schema.Types.String, required: true },
  buyIn: { type: mongoose.Schema.Types.Number, required: true },
  reminder: {
    hour: { type: mongoose.Schema.Types.Number, required: true },
    minute: { type: mongoose.Schema.Types.Number, required: true },
  },
  startDate: { type: mongoose.Schema.Types.Date, required: true },
  endDate: { type: mongoose.Schema.Types.Date, required: true },
});

const Goal = mongoose.model('Goal', goalSchema);

router.post('/', async (req: Request, res: Response) => {
  try {
    const { userA, userB, userAGoal, userBGoal, buyIn, reminder, startDate, endDate } = req.body;

    const newGoal = new Goal({
      userA,
      userB,
      userAGoal,
      userBGoal,
      buyIn,
      reminder,
      startDate,
      endDate,
    });

    const savedGoal = await newGoal.save();

    res.status(201).json(savedGoal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
