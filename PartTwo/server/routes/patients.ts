import express from "express";

import {
  getPatients,
  addPatient,
  getPatientById,
  addEntryToPatient,
} from "../services/patientsService";
import { newEntryProofing, newPatientEntryProofing } from "../utils/proofing";

const patientsRouter = express.Router();

patientsRouter.get("/", (_req, res) => {
  const patients = getPatients();
  res.send(patients);
});

patientsRouter.get("/:id", (req, res) => {
  const patientToFind = getPatientById(req.params.id);
  res.send(patientToFind);
});

patientsRouter.post("/", (req, res) => {
  const body = newPatientEntryProofing(req.body);
  const newPatientEntry = addPatient(body);
  res.json(newPatientEntry);
});

patientsRouter.post("/:id/entries", (req, res) => {
  console.log(req.body)
  const body = newEntryProofing(req.body);
  const newEntry = addEntryToPatient(req.params.id, body);
  res.json(newEntry);
});

export default patientsRouter;
