import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { Patient } from "../types";
import { setSinglePatient, useStateValue } from "../state";
import { apiBaseUrl } from "../constants";

const PatientSingle = () => {
  const { id } = useParams<{ id: string }>();
  if (typeof id !== "string") throw new Error("Error");
  const [{ patients }, dispatch] = useStateValue();
  const patient = patients[id];

  useEffect(() => {
    const patientToFetch = async () => {
      try {
        const { data: singlePatient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setSinglePatient(singlePatient));
      } catch (err) {
        console.log(err);
      }
    };
    !patient?.ssn && void patientToFetch();
  }, [dispatch]);

  return <div>{patient?.name}</div>;
};

export default PatientSingle;
