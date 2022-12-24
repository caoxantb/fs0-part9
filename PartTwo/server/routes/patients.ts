import express from "express";

import { getPatients, addPatient } from "../services/patientsService";
import { newPatientEntryProofing } from "../utils/proofing";

const patientsRouter = express.Router();

patientsRouter.get("/", (_req, res) => {
  const patients = getPatients();
  res.send(patients);
});

patientsRouter.post("/", (req, res) => {
  const body = newPatientEntryProofing(req.body);
  const newPatientEntry = addPatient(body);
  res.json(newPatientEntry);
});

export default patientsRouter;
