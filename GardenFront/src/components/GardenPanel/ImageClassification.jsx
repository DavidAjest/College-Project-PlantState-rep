import React, { useCallback } from "react";
import { useGardener } from "./Context";
import placeholder from "../../flower.png";
import gallery from "../../assets/gallery.png";
import Spinner from "../Spinner/Spinner";
import { useAuth } from "../../context/AuthContext";

function ImageClassification(props) {
  const { image, classifying, gardenState, isUninitialized } = useGardener();
  const { user } = useAuth();
  const ref = props.inputRef;

  const Modes = useCallback(() => {
    if (classifying) {
      return (
        <div className="text-center flex flex-col gap-2 items-center">
          <div className={`spinner loading`}></div>
          <span className="font-bold">Classifying..</span>
        </div>
      );
    }

    if (isUninitialized()) {
      if (image) {
        return (
          <div>
            <div className="text-center" style={{ fontWeight: 100, maxWidth: "200px", transform:"translateX(1rem)" }}>
              Ready for classification. waiting for instruction
            </div>
            <div
              className="text-center font-bold max-w-[220px] text-sm"
              style={{ transform: "translateY(1rem)" }}
            >
              Click the 'Classify' button to analyze the plant's health
            </div>
          </div>
        );
      }
      return (
        <div
          className="text-center font-bold max-w-[200px] text-sm"
          style={{ transform: "translateY(-1.5rem)" }}
        >
          Pick an image to analyze a plant's health
        </div>
      );
    }

    return (
      <div
        className="text-center"
        style={{
          display: "grid",
          gridTemplateColumns: user ? "1fr 1fr" : "1fr",
          gap: "1rem",
        }}
      >
        <div className="border-[1px] border-[lightgray] px-2 py-4 rounded-md">
          <div className="font-bold">Level of water:</div>
          <div>
            <span className={gardenState.needsWater ? "font-bold text-[#bd3333]" : ""}> LOW </span>
            ||
            <span className={!gardenState.needsWater ? "font-bold text-[green]" : ""}>
              {" "}
              NORMAL{" "}
            </span>
          </div>
          <span>
            Reccomendation:
            <br />
            {gardenState.message}
            <br />
          </span>
        </div>

        {user && (
          <div className="border-[1px] border-[lightgray] px-2 py-4 rounded-md">
            {/* Change here temperature to match temperature model */}
            <div className="font-bold">Temperature:</div>
            <div>
              <span className={gardenState.needsWater ? "font-bold text-[#bd3333]" : ""}>
                {" "}
                LOW{" "}
              </span>
              ||
              <span className={!gardenState.needsWater ? "font-bold text-[green]" : ""}>
                {" "}
                NORMAL{" "}
              </span>
            </div>
            <span>
              Reccomendation:
              <br />
              {gardenState.message}
              <br />
            </span>
          </div>
        )}
      </div>
    );
  }, [classifying, gardenState, image, user]);

  const Image = useCallback(() => {
    return (
      <div
        className={`min-h-[100px] overflow-hidden w-fit text-center m-8 rounded-md ${
          image ? "border-[1px]" : ""
        }`}
      >
        {image ? (
          <img
            src={image}
            width={220}
            height={200}
            className={!image ? `opacity-[0.2]` : ``}
            style={{
              boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px",
              background:"red",
            }}
            alt="Picture corrupted"
          />
        ) : (
          <div
            onClick={() => {
              if (ref.current) {
                ref.current.click();
              }
            }}
            className="cursor-pointer border-dashed border-[1px] flex-col border-[lightgray] rounded-lg w-[220px] h-[220px] flex items-center justify-center"
          >
            <img
              src={gallery}
              width={100}
              height={100}
              className="m-auto"
              alt="Picture corrupted"
            />
            <p className="m-0 mb-auto text-gray-500">Click to select an image (PNG, JPG, JPEG)</p>
          </div>
        )}

        {!image && (
          <div
            className="p-2"
            style={{
              fontWeight: 100,
              textDecoration: "underline",
              textDecorationThickness: 0,
              textUnderlinePosition: "under",
            }}
          >
            No picture picked yet
          </div>
        )}
      </div>
    );
  }, [image, ref]);

  return (
    <div className="min-w-[200px] grid place-items-center">
      <Image />
      <div>
        <Modes />
      </div>
    </div>
  );
}

export default ImageClassification;
