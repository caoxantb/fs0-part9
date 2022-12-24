import React from "react";

import { ContentProps } from "../types";

const Total = ({ courseParts }: { courseParts: ContentProps[] }) => {
  return (
    <>
      Number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </>
  );
};

export default Total;
