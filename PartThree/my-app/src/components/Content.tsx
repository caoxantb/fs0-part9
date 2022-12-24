import React from "react";

import { ContentProps } from "../types";

const Content = ({ courseParts }: { courseParts: ContentProps[] }) => {
  return (
    <>
      {courseParts.map((part) => (
        <div>
          {part.name} {part.exerciseCount}
        </div>
      ))}
    </>
  );
};

export default Content;
