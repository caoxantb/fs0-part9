import React from "react";

import { useStateValue } from "../../state";
import { Entry } from "../../types";
import { assertNever } from "../../utils/assertNever";
import Hospital from "./HospitalEntry";
import HealthCheck from "./HealthCheckEntry";
import Occupational from "./OccupationalEntry";

const entryType = (entry: Entry) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheck {...entry} />;
    case "Hospital":
      return <Hospital {...entry} />;
    case "OccupationalHealthcare":
      return <Occupational {...entry} />;
    default:
      return assertNever(entry);
  }
};

const EntryComponent = ({ entry }: { entry: Entry }) => {
  const [{ diagnosis }, dispatch] = useStateValue();

  return (
    <div
      style={{
        border: "1px solid black",
        borderRadius: "10px",
        margin: "10px",
        padding: "10px",
      }}
    >
      <div>{entry.date}</div>
      <i>{entry.description}</i>
      <div>Specialist: {entry.specialist}</div>
      {entry.diagnosisCodes ? (
        <ul>
          {entry?.diagnosisCodes.map((d) => (
            <li key={d}>
              {d} {diagnosis[d]?.name}
            </li>
          ))}
        </ul>
      ) : (
        <></>
      )}
      {entryType(entry)}
    </div>
  );
};

export default EntryComponent;
