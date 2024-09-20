import { createContext, ReactNode, useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { CreateRealEstateInterface } from "../types/types";

type RealEstateContextType =
  | UseFormReturn<CreateRealEstateInterface>
  | undefined;

export const RealEstateContext =
  createContext<RealEstateContextType>(undefined);

const CreateRealEstateContext = ({ children }: { children: ReactNode }) => {
  const locatStorageData: CreateRealEstateInterface = localStorage.getItem(
    "realEstateData"
  )
    ? JSON.parse(localStorage.getItem("realEstateData") || "")
    : {};

  const formMethods = useForm<CreateRealEstateInterface>({
    mode: "onChange",
    defaultValues: {
      address: locatStorageData.address || "",
      zip_code: locatStorageData.zip_code || "",
      region_id: Number(locatStorageData.region_id) || undefined,
      city_id: Number(locatStorageData.city_id) || undefined,
      deal_type: locatStorageData.deal_type || "",
      description: locatStorageData.description || "",
      price: Number(locatStorageData.price) || undefined,
      area: Number(locatStorageData.area) || undefined,
      bedrooms: Number(locatStorageData.bedrooms) || undefined,
      image: locatStorageData.image,
      agent_id: Number(locatStorageData.agent_id) || undefined,
    },
  });

  useEffect(() => {
    const subscription = formMethods.watch((data) => {
      saveToLocalStorage(data as CreateRealEstateInterface);
    });

    return () => subscription.unsubscribe();
  }, [formMethods.watch]);

  const saveToLocalStorage = (data: CreateRealEstateInterface) => {
    localStorage.setItem("realEstateData", JSON.stringify(data));
  };

  const values = {
    ...formMethods,
  };

  return (
    <RealEstateContext.Provider value={values}>
      {children}
    </RealEstateContext.Provider>
  );
};

export default CreateRealEstateContext;
