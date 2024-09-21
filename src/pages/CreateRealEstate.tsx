import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
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
import CreateAgentModal from "../components/createAgentComponents/CreateAgentModal";
import { useRealEstateContext } from "../context/useRealEstateContext";
import SecondaryButton from "../ui/SecondaryButton";
import Button from "../ui/Button";

const CreateRealEstate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    setValue,
    setError,
    clearErrors,
    watch,
  } = useRealEstateContext();

  const [region, setRegion] = useState<number | "">(0);

  const [selectedImage, setSelectedImage] = useState<File | string | null>(
    localStorage.getItem("uploadedImage") || ""
  );
  const [selectImage, setSelectImage] = useState<File | null>(null);
  const { data: regions, isPending: isRegionsPending } = useGerRegions();
  const { cities, isCitiesPending } = useGerCities();
  const { agents, isAgentsPending } = useGetAgents();
  const { storeRealEstate, isCreating } = useStoreRealEstate();
  const [isModalOpen, setIsAgentModalOpen] = useState(false);

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<CreateRealEstateInterface> = (data) => {
    const newData = {
      ...(selectImage ? { image: selectImage } : {}),
      is_rental: data.deal_type === "rental" ? 1 : 0,
      region_id: Number(data.region_id),
      city_id: Number(data.city_id),
      agent_id: Number(data.agent_id),
      address: data.address,
      description: data.description,
      zip_code: data.zip_code,
      price: data.price,
      area: data.area,
      bedrooms: data.bedrooms,
    };

    console.log(newData);
    storeRealEstate(newData, {
      onSuccess: () => {
        navigate("/");
        localStorage.removeItem("realEstateData");
      },
    });
  };

  const filteredCities = cities?.filter(
    (item: { region_id: string | number; id: string | number }) =>
      item.region_id === region
  );

  const handleResetForm = () => {
    setSelectedImage(null);
    setRegion("");
    reset();
    navigate(-1);
  };

  if (isRegionsPending || isCitiesPending || isAgentsPending) return <Loader />;

  return (
    <div className="w-full px-[162px] flex justify-center items-center flex-col">
      <h1 className="text-center mt-[62px] font-firago font-medium text-[32px] leading-[38.4px] text-[#021526]">
        ლისტინგის დამატება
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-[790px] mt-[99px] w-full m-auto flex justify-center items-start flex-col gap-[60px]"
      >
        <RealEstateType register={register} errors={errors} trigger={trigger} />

        <LocationDetails
          register={register}
          errors={errors}
          region={region}
          setRegion={setRegion}
          setValue={setValue}
          regions={regions}
          cities={filteredCities}
          trigger={trigger}
          watch={watch}
        />

        <Details
          register={register}
          errors={errors}
          trigger={trigger}
          watch={watch}
        />

        <Description
          register={register}
          errors={errors}
          trigger={trigger}
          watch={watch}
        />

        <FileUpload
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          register={register}
          errors={errors}
          trigger={trigger}
          setError={setError}
          clearErrors={clearErrors}
          setSelectImage={setSelectImage}
        />

        <SelectAgent
          errors={errors}
          agents={agents}
          setIsAgentModalOpen={setIsAgentModalOpen}
          trigger={trigger}
          setValue={setValue}
          register={register}
        />

        <div className="w-full flex justify-end items-center mt-[20px] gap-[15px]">
          <SecondaryButton size="md" onClick={() => handleResetForm()}>
            გაუქმება
          </SecondaryButton>

          <Button type="submit" isPending={isCreating}>
            {isCreating ? "დაელოდეთ..." : "გაგზავნა"}
          </Button>
        </div>
      </form>
      {isModalOpen && (
        <CreateAgentModal setIsAgentModalOpen={setIsAgentModalOpen} />
      )}
    </div>
  );
};

export default CreateRealEstate;
