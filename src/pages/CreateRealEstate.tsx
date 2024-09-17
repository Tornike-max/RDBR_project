import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useStoreRealEstate } from "../hooks/useStoreRealEstate";

import { useGetAgents } from "../hooks/useGetAgents";
import { useGerRegions } from "../hooks/useGetRegions";
import { useGerCities } from "../hooks/useGetCities";
import { CreateRealEstateInterface } from "../types/types";
import { useNavigate } from "react-router-dom";
import RealEstateType from "../components/createRealEstate/RealEstateType";
import LocationDetails from "../components/createRealEstate/LocationDetails";
import Details from "../components/createRealEstate/Details";
import Description from "../components/createRealEstate/Description";
import FileUpload from "../components/createRealEstate/FileUpload";
import SelectAgent from "../components/createRealEstate/SelectAgent";
import Loader from "../ui/Loader";

const CreateRealEstate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    trigger,
  } = useForm<CreateRealEstateInterface>({ mode: "onChange" });

  const [region, setRegion] = useState<number | "">(0);
  const [isRental, setIsRental] = useState(false);
  const [isSale, setIsSale] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { data: regions, isPending: isRegionsPending } = useGerRegions();
  const { cities, isCitiesPending } = useGerCities();
  const { agents, isAgentsPending } = useGetAgents();
  const { storeRealEstate, isCreating } = useStoreRealEstate();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<CreateRealEstateInterface> = (data) => {
    const newData = {
      ...data,
      ...(selectedImage ? { image: selectedImage } : {}),
      is_rental: isRental ? 1 : 0,
      region_id: Number(data.region_id),
      city_id: Number(data.city_id),
      agent_id: Number(data.agent_id),
    };

    storeRealEstate(newData, {
      onSuccess: () => {
        navigate("/");
      },
    });
  };

  const filteredCities = cities?.filter(
    (item: { region_id: string | number; id: string | number }) =>
      item.region_id === region
  );

  const handleResetForm = () => {
    setSelectedImage(null);
    setIsRental(false);
    setIsSale(false);
    setRegion("");
    reset();
  };

  if (isRegionsPending || isCitiesPending || isAgentsPending) return <Loader />;

  return (
    <div className="w-full flex justify-center items-center flex-col">
      <h1 className="text-center mt-[62px] font-[500] text-[32px] leading-[38.4px] text-[#021526]">
        ლისტინგის დამატება
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-[790px] mt-[99px] w-full m-auto flex justify-center items-start flex-col gap-[60px]"
      >
        <RealEstateType
          isSale={isSale}
          isRental={isRental}
          setIsSale={setIsSale}
          setIsRental={setIsRental}
        />

        <LocationDetails
          register={register}
          errors={errors}
          region={region}
          setRegion={setRegion}
          regions={regions}
          cities={filteredCities}
          getValues={getValues}
          trigger={trigger}
        />

        <Details
          register={register}
          errors={errors}
          trigger={trigger}
          getValues={getValues}
        />

        <Description register={register} errors={errors} trigger={trigger} />

        <FileUpload
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          register={register}
          errors={errors}
        />

        <SelectAgent register={register} errors={errors} agents={agents} />

        <div className="w-full flex justify-end items-center mt-[20px] gap-[15px]">
          <button
            type="button"
            onClick={() => handleResetForm()}
            className="rounded-[10px] border-[1px] border-[#F93B1D] text-[#F93B1D] hover:bg-[#F93B1D] hover:text-[#FFFFFF] text-[16px] leading-[19.2px] font-[500] text-center py-[10px] px-[16px] duration-200 transition-all ease-in-out"
          >
            გაუქმება
          </button>
          <button
            type="submit"
            className="h-[47px] rounded-[10px]  border-[1px] text-[#FFFFFF] bg-[#F93B1D] hover:bg-[#DF3014] border-[#F93B1D] px-[16px] py-[10px] gap-[2px] flex items-center justify-center w-[203px]"
          >
            {isCreating ? "დაელოდეთ..." : "გაგზავნა"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateRealEstate;
