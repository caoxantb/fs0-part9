import React from "react";
import { HealthCheckEntry } from "../../types";
import HealthRatingBar from "../HealthRatingBar";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";

const HealthCheck = (entry: HealthCheckEntry) => {
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
        <MonitorHeartIcon /> <strong>Health Check</strong>
      </div>
      <HealthRatingBar showText={false} rating={entry.healthCheckRating} />
    </>
  );
};

export default HealthCheck;
