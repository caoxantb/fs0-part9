import { PatientsEntry, Gender } from "../types";

export const newPatientEntryProofing = (object: any): Omit<PatientsEntry, "id"> => {
  ["name", "dateOfBirth", "ssn", "occupation"].forEach((key) => {
    if (
      !object[key] ||
      !(typeof object[key] === "string" || object[key] instanceof String)
    )
      throw new Error("Wrong request body");
  });

  if (!Object.values(Gender).includes(object.gender))
    throw new Error("Wrong enum type gender");

  const { name, dateOfBirth, gender, ssn, occupation, entries } = object;
  return { name, dateOfBirth, gender, ssn, occupation, entries } 
};

