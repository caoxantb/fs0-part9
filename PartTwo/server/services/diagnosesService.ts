import { diagnosesData } from "../data/diagnoses";

import { DiagnosesEntry } from "../types";

export const getDiagnoses = (): DiagnosesEntry[] => {
  return diagnosesData;
};

