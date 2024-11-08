import React, { createRef, useRef } from "react";
import Controls from "./Controls";
import { WithGardenerContext } from "./Context";
import ImageClassification from "./ImageClassification";

function GardenPanel() {
  const ref = useRef();
  return (
    <div>
      <Controls inputRef={ref} />
      <ImageClassification inputRef={ref} />
    </div>
  );
}

export default WithGardenerContext(GardenPanel);
