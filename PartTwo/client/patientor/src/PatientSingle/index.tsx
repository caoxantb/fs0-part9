import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { Patient, Entry } from "../types";
import { setSinglePatient, useStateValue, addEntry } from "../state";
import { apiBaseUrl } from "../constants";
import EntryComponent from "../components/Entry";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import { Form } from "formik";

const PatientSingle = () => {
  const { id } = useParams<{ id: string }>();
  if (typeof id !== "string") throw new Error("Error");
  const [{ patients }, dispatch] = useStateValue();
  const patient = patients[id];
  const [entryInput, setEntryInput] = useState({
    description: "",
    date: "",
    specialist: "",
    healthCheckRating: 0,
  });

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

  const addNewEntry = async () => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        entryInput
      );
      console.log("response from submit", newEntry);
      dispatch(addEntry(newEntry, id));
    } catch (e) {
      console.error(e.response.data);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const handleFormChange = (event: any) => {
    const target = event.target as HTMLInputElement;
    setEntryInput({
      ...entryInput,
      [target.id]: target.value,
    });
  };

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

      <form
        onSubmit={() => void addNewEntry()}
      >
        <label>
          Description:
          <input
            id="description"
            type="text"
            onChange={handleFormChange}
          />
        </label>
        <label>
          Date:
          <input id="date" type="text" onChange={handleFormChange} />
        </label>{" "}
        <label>
          Specialist:
          <input
            id="specialist"
            type="text"
            onChange={handleFormChange}
          />
        </label>
        <label>
          Health Rating:
          <input
            id="healthCheckRating"
            type="number"
            onChange={handleFormChange}
          />
        </label>
        <button type="submit" value="Submit" />
      </form>

      {patient?.entries.length > 0 ? <h3>Entries</h3> : <></>}
      {patient?.entries.map((entry, idx) => (
        <EntryComponent key={idx} entry={entry} />
      ))}
    </>
  );
};

export default PatientSingle;
