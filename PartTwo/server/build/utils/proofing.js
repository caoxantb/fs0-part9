"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newPatientEntryProofing = void 0;
const types_1 = require("../types");
const newPatientEntryProofing = (object) => {
    ["name", "dateOfBirth", "ssn", "occupation"].forEach((key) => {
        if (!object[key] ||
            !(typeof object[key] === "string" || object[key] instanceof String))
            throw new Error("Wrong request body");
    });
    if (!Object.values(types_1.Gender).includes(object.gender))
        throw new Error("Wrong enum type gender");
    const { name, dateOfBirth, gender, ssn, occupation, entries } = object;
    return { name, dateOfBirth, gender, ssn, occupation, entries };
};
exports.newPatientEntryProofing = newPatientEntryProofing;
