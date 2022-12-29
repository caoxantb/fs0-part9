import React from "react";
import { HospitalEntry } from "../../types";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const Hospital = (entry: HospitalEntry) => {
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
        <LocalHospitalIcon /> <strong>Hospital Check</strong>
      </div>
      <h4 style={{ margin: "0" }}>Discharge</h4>
      <div>Date: {entry.discharge?.date}</div>
      <div>Criteria: {entry.discharge?.criteria}</div>
    </>
  );
};

export default Hospital;
