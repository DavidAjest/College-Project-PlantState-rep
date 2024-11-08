import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { addDoc, collection, setDoc, updateDoc } from "firebase/firestore";
import { database } from "../../firebase";

const GardenerContext = React.createContext(null);
const WithGardenerContext = (Component) => {
  return function useGardener(props) {
    const [image, setImage] = useState(null);
    const [classifying, setClassifying] = useState(false);
    const { user } = useAuth();
    const [gardenState, setGardenState] = useState({
      needsWater: null,
      temperature: null,
    });

    const isUninitialized = () =>
      gardenState.needsWater === null && gardenState.temperature === null;
    const withStateCopy = (newState) => {
      return { ...gardenState, ...newState };
    };
    const updateGardenState = (newState) => {
      setGardenState(withStateCopy(newState));
    };

    const resetState = () => {
      setClassifying(false);
      setImage(null);
      setGardenState({
        needsWater: null,
        temperature: null,
      });
    };

    const classify = async (file) => {
      setClassifying(true);
      try {
        const formData = new FormData();
        formData.set("file", file);
        const { data } = await axios.post("/predict", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const { message, class: isHealthy, prediction } = data;
        updateGardenState({
          needsWater: !isHealthy,
          message,
        });
        await addDoc(collection(database, `users/${user.uid}/predictions`), {
          ...data,
          date: Date.now(),
        });
      } catch (e) {
        console.error(e);
      } finally {
        setClassifying(false);
      }
    };

    return (
      <GardenerContext.Provider
        value={{
          gardenState,
          classifying,
          image,
          classify,
          resetState,
          isUninitialized,
          setClassifying,
          setImage,
        }}
      >
        <Component {...props} />
      </GardenerContext.Provider>
    );
  };
};

const useGardener = () => {
  const context = React.useContext(GardenerContext);
  if (!context) {
    throw new Error("Gardener context not provided");
  }
  return context;
};
export { WithGardenerContext, useGardener };
