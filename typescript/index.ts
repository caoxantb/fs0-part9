import express from "express";
import { calculateBMI } from "./bmiCalculator";

const app = express();

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;
  if (typeof height !== "string" || typeof weight !== "string") {
    throw new Error("Query param has to be of type string");
  }
  const result = calculateBMI(parseInt(height) || 0, parseInt(weight) || 0);
  res.send({
    height,
    weight,
    bmi: result,
  });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
