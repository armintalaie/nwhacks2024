import express from "express";
import { goals } from "./routes";

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

app.listen(port, () => {
  console.log(`Server is running at http://${host}:${port}`);
});
