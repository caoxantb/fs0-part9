import { v1 as uuid } from "uuid";

import { patientsData } from "../data/patients";
import { PatientsEntry } from "../types";

export const getPatients = (): Omit<PatientsEntry, "ssn">[] => {
  return patientsData.map((data) => {
    const { ssn, ...dataOmittingSSN } = data;
    return dataOmittingSSN;
  });
};

export const getPatientById = (id: string): PatientsEntry | undefined => {
  const patientToFind = patientsData.find((patient) => patient.id === id);
  return patientToFind;
};

export const addPatient = (data: Omit<PatientsEntry, "id">): PatientsEntry => {
  const id = uuid();
  const newPatientEntry = {
    id,
    ...data,
  };
  patientsData.push(newPatientEntry);
  return newPatientEntry;
};
