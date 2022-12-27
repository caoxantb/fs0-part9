import React from "react";

import { CoursePart } from "../types";
import { assertNever } from "../utils/assert-never";

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.type) {
    case "normal":
      return (
        <>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <div>{part.description}</div>
        </>
      );

    case "groupProject":
      return (
        <>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <div>Group Project Count {part.groupProjectCount}</div>
        </>
      );
    case "submission":
      return (
        <>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <div>{part.description}</div>
          <div>Link {part.exerciseSubmissionLink}</div>
        </>
      );
    case "special":
      return (
        <>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <div>{part.description}</div>
          <div>required skills {part.requirements.join()}</div>
        </>
      );
    default:
      return assertNever(part);
  }
};

export default Part