import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { Patient } from "../types";
import { setSinglePatient, useStateValue } from "../state";
import { apiBaseUrl } from "../constants";
import EntryComponent from "../components/Entry";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";

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

  return (
    <>
      <h2>
        {patient?.name}{" "}
        {patient?.gender === "male" ? (
          <MaleIcon />
        ) : patient?.gender === "female" ? (
          <FemaleIcon />
        ) : (
          <TransgenderIcon />
        )}
      </h2>
        <div>ssn: {patient?.ssn}</div>
        <div>occupation: {patient?.occupation}</div>

      {patient?.entries.length > 0 ? <h3>Entries</h3> : <></>}
      {patient?.entries.map((entry, idx) => (
        <EntryComponent key={idx} entry={entry} />
      ))}
    </>
  );
};

export default PatientSingle;
