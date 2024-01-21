import express, { Request, Response } from 'express';
import mongoose from '../database'; // Import the MongoDB connection
import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/';
    // Create the 'uploads/' directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    // Create a subdirectory for each goalid
    const goalDir = path.join(uploadDir, req.params.goalid);
    if (!fs.existsSync(goalDir)) {
      fs.mkdirSync(goalDir);
    }

    cb(null, goalDir);
  },
  filename: function (req, file, cb) {
    const uniqueFileName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueFileName);
  },
});

const upload = multer({ storage });

const router = express.Router();

const goalSchema = new mongoose.Schema({
  goalid: { type: mongoose.Schema.Types.String, default: uuidv4 },
  userA: { type: mongoose.Schema.Types.String, required: true },
  userB: { type: mongoose.Schema.Types.String, default: null },
  userAGoal: { type: mongoose.Schema.Types.String, required: true },
  userBGoal: { type: mongoose.Schema.Types.String, default: null },
  buyIn: { type: mongoose.Schema.Types.Number, required: true },
  reminder: {
    hour: { type: mongoose.Schema.Types.Number, required: true },
    minute: { type: mongoose.Schema.Types.Number, required: true },
  },
  startDate: { type: mongoose.Schema.Types.Date, required: true },
  endDate: { type: mongoose.Schema.Types.Date, required: true },
});

const daySchema = new mongoose.Schema({
  goalid: { type: mongoose.Schema.Types.String, required: true },
  user: { type: mongoose.Schema.Types.String, required: true },
  datetime: { type: mongoose.Schema.Types.Date, required: true },
  photo: { type: [mongoose.Schema.Types.String], required: true },
});

const Goal = mongoose.model('Goal', goalSchema);
const Day = mongoose.model('Day', daySchema);

/*
curl -X POST \
http://localhost:3000/goals \
-H 'Content-Type: application/json' \
-d '{
  "userA": "123456",
  "userAGoal": "Exercise daily",
  "buyIn": 10,
  "reminder": {
    "hour": 8,
    "minute": 30
  },
  "startDate": "2024-01-20T10:00:00Z",
  "endDate": "2024-01-31T18:00:00Z"
}'
*/
router.post('/', async (req: Request, res: Response) => {
  try {
    const { userA, userAGoal, buyIn, reminder, startDate, endDate } = req.body;

    const newGoal = new Goal({
      userA,
      userAGoal,
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

/*
curl -X PATCH \
http://localhost:3000/goals/<your-goal-id> \
-H 'Content-Type: application/json' \
-d '{
  "userB": "789012",
  "userBGoal": "New userB goal"
}'
*/
router.patch('/:goalid', async (req: Request, res: Response) => {
  try {
    const { goalid } = req.params;
    const { userB, userBGoal } = req.body;

    const goal = await Goal.findOne({ goalid });

    if (!goal) {
      return res.status(404).json({ error: 'Goal not found' });
    }

    if (goal.userB !== null) {
      return res.status(400).json({ error: 'UserB is already set for this goal' });
    }

    goal.userB = userB;
    goal.userBGoal = userBGoal;

    const updatedGoal = await goal.save();

    res.status(200).json(updatedGoal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// curl http://localhost:3000/goals/<goalid>
router.get('/:goalid', async (req: Request, res: Response) => {
  try {
    const { goalid } = req.params;

    const goal = await Goal.findOne({ goalid });

    if (!goal) {
      return res.status(404).json({ error: 'Goal not found' });
    }

    res.status(200).json(goal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/*
curl -X POST \
http://localhost:3000/goals/<goalid>/days \
-H 'Content-Type: multipart/form-data' \
-F 'user=<userid>' \
-F 'photo=@<filepath.type>'
*/
router.post('/:goalid/days', upload.single('photo'), async (req: Request, res: Response) => {
  try {
    // TODO: validate user is allowed to uplaod to this goal
    // don't let a user upload a photo again...?
    const { goalid } = req.params;
    const { user } = req.body;
    const datetime = Date.now();
    // @ts-ignore
    const photo: string = req.file.filename;
    // TODO: fix this so it uploads some photo to firebase

    const newDay = new Day({
      goalid,
      user,
      datetime,
      photo,
    });

    const savedDay = await newDay.save();

    res.status(201).json(savedDay);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/*
* curl -X GET \
* http://localhost:3000/goals/<goalid>/days
*/
router.get('/:goalid/days', async (req: Request, res: Response) => {
  try {
    const { goalid } = req.params;

    const days = await Day.find({ goalid });

    res.status(200).json(days);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
