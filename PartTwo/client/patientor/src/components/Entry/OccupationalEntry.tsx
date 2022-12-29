import React from "react";
import { OccupationalHealthcareEntry } from "../../types";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";

const Occupational = (entry: OccupationalHealthcareEntry) => {
  return (
    <>
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <AddBusinessIcon /> <strong>Occupational Healthcare Check</strong>
      </div>
      <div>Employer: {entry.employerName}</div>
      {entry.sickLeave ? (
        <>
          {" "}
          <h4 style={{ margin: "0" }}>Sick Leave</h4>
          <div>
            Timespan: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Occupational;
