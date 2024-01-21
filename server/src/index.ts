import express from "express";
import { goals } from "./routes";

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello, Express with TypeScript!");
});

app.use("/goals", goals);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
