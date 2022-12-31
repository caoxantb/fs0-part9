"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addEntryToPatient = exports.addPatient = exports.getPatientById = exports.getPatients = void 0;
const uuid_1 = require("uuid");
const patients_1 = require("../data/patients");
const getPatients = () => {
    return patients_1.patientsData.map((data) => {
        const { ssn } = data, dataOmittingSSN = __rest(data, ["ssn"]);
        return dataOmittingSSN;
    });
};
exports.getPatients = getPatients;
const getPatientById = (id) => {
    const patientToFind = patients_1.patientsData.find((patient) => patient.id === id);
    return patientToFind;
};
exports.getPatientById = getPatientById;
const addPatient = (data) => {
    const id = (0, uuid_1.v1)();
    const newPatientEntry = Object.assign({ id }, data);
    patients_1.patientsData.push(newPatientEntry);
    return newPatientEntry;
};
exports.addPatient = addPatient;
const addEntryToPatient = (patientId, entry) => {
    const id = (0, uuid_1.v1)();
    const newEntry = Object.assign(Object.assign({}, entry), { id });
    const patientToAddIndex = patients_1.patientsData.findIndex((patient) => patient.id === patientId);
    if (patientToAddIndex < 0)
        throw new Error("No patient found");
    patients_1.patientsData[patientToAddIndex].entries.push(newEntry);
    return newEntry;
};
exports.addEntryToPatient = addEntryToPatient;
