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

const CreateRealEstate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateRealEstateInterface>();

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

  if (isRegionsPending || isCitiesPending || isAgentsPending)
    return <p>Loading...</p>;

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
          cities={cities}
        />

        <Details register={register} errors={errors} />

        <Description register={register} errors={errors} />

        <FileUpload
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          register={register}
          errors={errors}
        />

        <SelectAgent register={register} errors={errors} agents={agents} />

        <div className="w-full flex justify-center items-center mt-[20px]">
          <button
            type="submit"
            className="bg-[#1A1A1F] text-white py-[12px] px-[20px] rounded-[6px] text-[16px] leading-[19.54px]"
          >
            {isCreating ? "დაელოდეთ..." : "გაგზავნა"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateRealEstate;
