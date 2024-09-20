import { useContext } from "react";
import { RealEstateContext } from "./CreateRealEstateContext";

export const useRealEstateContext = () => {
  const context = useContext(RealEstateContext);
  if (!context) {
    throw new Error(
      "useRealEstateContext must be used within a RealEstateProvider"
    );
  }
  return context;
};
