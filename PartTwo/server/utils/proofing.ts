import {
  PatientsEntry,
  Gender,
  Entry,
  HealthCheckRating,
  HealthCheckEntry,
  OccupationalHealthcareEntry,
  HospitalEntry,
} from "../types";

export const newPatientEntryProofing = (
  object: any
): Omit<PatientsEntry, "id"> => {
  ["name", "dateOfBirth", "ssn", "occupation"].forEach((key) => {
    if (
      !object[key] ||
      !(typeof object[key] === "string" || object[key] instanceof String)
    )
      throw new Error("Wrong request body");
  });

  if (!object.gender || !Object.values(Gender).includes(object.gender))
    throw new Error("Wrong enum type gender");

  const { name, dateOfBirth, gender, ssn, occupation, entries } = object;
  return { name, dateOfBirth, gender, ssn, occupation, entries };
};

export const newHealthCheckEntryProofing = (
  object: any
): Pick<HealthCheckEntry, "healthCheckRating"> => {
  if (
    !object.healthCheckRating ||
    !Object.values(HealthCheckRating).includes(object.healthCheckRating)
  )
    throw new Error("Wrong enum type gender");
  return { healthCheckRating: object.healthCheckRating };
};

export const newOccupationalProofing = (
  object: any
): Pick<OccupationalHealthcareEntry, "employerName" | "sickLeave"> => {
  if (
    !object.employerName ||
    !(
      typeof object.employerName === "string" ||
      object.employerName instanceof String
    )
  )
    throw new Error("Wrong request body");
  if (!object.sickLeave) return { employerName: object.employerName };
  return { employerName: object.employerName, sickLeave: object.sickLeave };
};

export const newHospitalProofing = (
  object: any
): Pick<HospitalEntry, "discharge"> => {
  if (!object.discharge) throw new Error("Wrong request body");

  ["date", "criteria"].forEach((key) => {
    if (
      !object[key] ||
      !(typeof object[key] === "string" || object[key] instanceof String)
    )
      throw new Error("Wrong request body");
  });
  return { discharge: object.discharge };
};

export const newEntryProofing = (object: any): Omit<Entry, "id"> => {
  ["description", "date", "specialist", "type"].forEach((key) => {
    if (
      !object[key] ||
      !(typeof object[key] === "string" || object[key] instanceof String)
    )
      throw new Error("Wrong request body");
  });

  const { description, date, specialist, type } = object;

  switch (object.type) {
    case "HealthCheck":
      const returnHealthCheck = newHealthCheckEntryProofing(object);
      const healthCheck: Omit<HealthCheckEntry, "id"> = {
        description,
        date,
        specialist,
        type,
        ...returnHealthCheck,
      };
      return healthCheck;
    case "OccupationalHealthcare":
      const returnOccupationalCheck = newOccupationalProofing(object);
      const occupationalHealth: Omit<OccupationalHealthcareEntry, "id"> = {
        description,
        date,
        specialist,
        type,
        ...returnOccupationalCheck,
      };
      return occupationalHealth;
    case "Hospital":
      const returnHospitalCheck = newHospitalProofing(object);
      const hospital: Omit<HospitalEntry, "id"> = {
        description,
        date,
        specialist,
        type,
        ...returnHospitalCheck,
      };
      return hospital;
    default:
      throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(object)}`
      );
  }
};
