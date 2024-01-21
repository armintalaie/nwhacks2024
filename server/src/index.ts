import express from "express";
import { goals } from "./routes";
import admin from 'firebase-admin';

const FIREBASE_SERVICE_ACCOUNT = process.env.FIREBASE_SERVICE_ACCOUNT || "";
const serviceAccount = JSON.parse(Buffer.from(FIREBASE_SERVICE_ACCOUNT, 'base64').toString('utf-8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // databaseURL: 'https://your-database-name.firebaseio.com' // If using Firebase Realtime Database
});

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

app.get("/", (req, res) => {
  res.json({ status: "OK" });
});

app.get("/status", (req, res) => {
  res.json({ status: "OK" });
});

app.use("/goals", goals);

/**
 * TODO(michaelfromyeg): make this be based on the goalid, i.e., one user pokes the other
 * 
 * Tricky to get the other user's token... maybe we need to store it in the database? 
 *
 * e.g., curl -X POST http://localhost:3000/notify \
 *  -H "Content-Type: application/json" \
 * -d '{"token": "your_firebase_device_token", "title": "Test Notification", "body": "This is a test message"}'
 */
app.post("/notify", async (req, res) => {
  const { token, title, body } = req.body;

  const message = {
      notification: {
          title: title,
          body: body,
      },
      token: token,
  };

  try {
    const response = await admin.messaging().send(message);

    res.status(200).send(`Successfully sent message: ${response}`);
  } catch (error) {
    res.status(500).send(`Error sending message: ${error}`);
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://${host}:${port}`);
});
