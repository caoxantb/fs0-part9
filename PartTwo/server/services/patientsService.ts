import { v1 as uuid } from "uuid";
import { patientsData } from "../data/patients";
import { Entry, PatientsEntry } from "../types";

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

export const addEntryToPatient = (patientId: string, entry: Omit<Entry, 'id'>): Entry => {
  const id = uuid();
  const newEntry: any = { ...entry, id };

  const patientToAddIndex = patientsData.findIndex(
    (patient) => patient.id === patientId
  );

  if (patientToAddIndex < 0) throw new Error("No patient found");
  patientsData[patientToAddIndex].entries.push(newEntry);
  return newEntry;
};
