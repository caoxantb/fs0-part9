import express from "express";
import { calculateBMI } from "./bmiCalculator";
import { calculateExercise } from "./exerciseCalculator";

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

app.post("/exercise", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { dailyHours, targetHours } = req.body;

	if(dailyHours === 'undefined' || targetHours === 'undefined') {
		return res.status(400).send({ error: 'Parameters missing'});
	}
	if(isNaN(Number(targetHours)) || dailyHours.some(isNaN)) {
		return res.status(400).send({ error: 'Malformatted parameter'});
	}

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculateExercise(dailyHours, targetHours);
  return res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
