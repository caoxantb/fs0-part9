"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newEntryProofing = exports.newHospitalProofing = exports.newOccupationalProofing = exports.newHealthCheckEntryProofing = exports.newPatientEntryProofing = void 0;
const types_1 = require("../types");
const newPatientEntryProofing = (object) => {
    ["name", "dateOfBirth", "ssn", "occupation"].forEach((key) => {
        if (!object[key] ||
            !(typeof object[key] === "string" || object[key] instanceof String))
            throw new Error("Wrong request body");
    });
    if (!object.gender || !Object.values(types_1.Gender).includes(object.gender))
        throw new Error("Wrong enum type gender");
    const { name, dateOfBirth, gender, ssn, occupation, entries } = object;
    return { name, dateOfBirth, gender, ssn, occupation, entries };
};
exports.newPatientEntryProofing = newPatientEntryProofing;
const newHealthCheckEntryProofing = (object) => {
    if (!object.healthCheckRating ||
        !Object.values(types_1.HealthCheckRating).includes(object.healthCheckRating))
        throw new Error("Wrong enum type gender");
    return { healthCheckRating: object.healthCheckRating };
};
exports.newHealthCheckEntryProofing = newHealthCheckEntryProofing;
const newOccupationalProofing = (object) => {
    if (!object.employerName ||
        !(typeof object.employerName === "string" ||
            object.employerName instanceof String))
        throw new Error("Wrong request body");
    if (!object.sickLeave)
        return { employerName: object.employerName };
    return { employerName: object.employerName, sickLeave: object.sickLeave };
};
exports.newOccupationalProofing = newOccupationalProofing;
const newHospitalProofing = (object) => {
    if (!object.discharge)
        throw new Error("Wrong request body");
    ["date", "criteria"].forEach((key) => {
        if (!object[key] ||
            !(typeof object[key] === "string" || object[key] instanceof String))
            throw new Error("Wrong request body");
    });
    return { discharge: object.discharge };
};
exports.newHospitalProofing = newHospitalProofing;
const newEntryProofing = (object) => {
    ["description", "date", "specialist", "type"].forEach((key) => {
        if (!object[key] ||
            !(typeof object[key] === "string" || object[key] instanceof String))
            throw new Error("Wrong request body");
    });
    const { description, date, specialist, type } = object;
    switch (object.type) {
        case "HealthCheck":
            const returnHealthCheck = (0, exports.newHealthCheckEntryProofing)(object);
            const healthCheck = Object.assign({ description,
                date,
                specialist,
                type }, returnHealthCheck);
            return healthCheck;
        case "OccupationalHealthcare":
            const returnOccupationalCheck = (0, exports.newOccupationalProofing)(object);
            const occupationalHealth = Object.assign({ description,
                date,
                specialist,
                type }, returnOccupationalCheck);
            return occupationalHealth;
        case "Hospital":
            const returnHospitalCheck = (0, exports.newHospitalProofing)(object);
            const hospital = Object.assign({ description,
                date,
                specialist,
                type }, returnHospitalCheck);
            return hospital;
        default:
            throw new Error(`Unhandled discriminated union member: ${JSON.stringify(object)}`);
    }
};
exports.newEntryProofing = newEntryProofing;
