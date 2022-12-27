"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientsService_1 = require("../services/patientsService");
const proofing_1 = require("../utils/proofing");
const patientsRouter = express_1.default.Router();
patientsRouter.get("/", (_req, res) => {
    const patients = (0, patientsService_1.getPatients)();
    res.send(patients);
});
patientsRouter.get("/:id", (req, res) => {
    const patientToFind = (0, patientsService_1.getPatientById)(req.params.id);
    res.send(patientToFind);
});
patientsRouter.post("/", (req, res) => {
    const body = (0, proofing_1.newPatientEntryProofing)(req.body);
    const newPatientEntry = (0, patientsService_1.addPatient)(body);
    res.json(newPatientEntry);
});
exports.default = patientsRouter;
