import React, { useState } from "react";
import { useGardener } from "./Context";

function Controls(props) {
  const { setImage, classify, isUninitialized, resetState } = useGardener();
  const ref = props.inputRef;
  const [file, setFile] = useState();
  return (
    <div className="flex items-center gap-2 min-h-[80px]  mx-auto w-fit ">
      <label htmlFor="image-input" className="font-bold w-fit border-[1px] p-2 cursor-pointer">
        Choose an image
      </label>
      <input
        ref={ref}
        type="file"
        id="image-input"
        className="hidden"
        onChange={(e) => {
          setImage(URL.createObjectURL(e.target.files[0]));
          setFile(e.target.files[0]);
        }}
      />
      <button
        onClick={() => {
          classify(file);
        }}
      >
        Classify
      </button>
      {!isUninitialized() && <button onClick={resetState}>Reset</button>}
    </div>
  );
}

export default Controls;
