"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientsService_1 = require("../services/patientsService");
const patientsRouter = express_1.default.Router();
patientsRouter.get("/", (_req, res) => {
    const patients = (0, patientsService_1.getPatients)();
    res.send(patients);
});
patientsRouter.post("/", (req, res) => {
    const { name, dateOfBirth, gender, ssn, occupation } = req.body;
    const newPatientEntry = (0, patientsService_1.addPatient)({
        name,
        dateOfBirth,
        gender,
        ssn,
        occupation,
    });
    res.json(newPatientEntry);
});
exports.default = patientsRouter;
