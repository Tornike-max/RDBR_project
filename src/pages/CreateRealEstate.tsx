import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useStoreRealEstate } from "../hooks/useStoreRealEstate";

import { useGetAgents } from "../hooks/useGetAgents";
import { useGerRegions } from "../hooks/useGetRegions";
import { useGerCities } from "../hooks/useGetCities";

type FormData = {
  address: string;
  zip_code: number;
  region_id: number;
  city_id: number;
  price: number;
  area: number;
  bedrooms: number;
  description: string;
  image: FileList;
  agent_id: number;
};

const CreateRealEstate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<FormData>();

  const [region, setRegion] = useState<number | "">(0);
  const [isRental, setIsRental] = useState(false);
  const [isSale, setIsSale] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: regions, isPending: isRegionsPending } = useGerRegions();
  const { cities, isCitiesPending } = useGerCities();
  const { agents, isAgentsPending } = useGetAgents();

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const newData = { ...data, image: data.image[0] };
    console.log(newData);
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
        <div className="w-[266px] flex justify-center items-start flex-col gap-5">
          <h3 className="font-[500] text-[16px] leading-[19.54px] text-[#1A1A1F]">
            გარიგების ტიპი
          </h3>
          <div className="w-full flex justify-start items-center gap-[32px]">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="is_sale"
                className="rounded-checkbox"
                checked={isSale}
                onChange={() => {
                  const result = !isSale;
                  setIsSale(result);
                  setIsRental(!result);
                }}
              />
              <label htmlFor="is_sale" className="text-sm">
                იყიდება
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="is_rental"
                className="rounded-checkbox"
                checked={isRental}
                onChange={() => {
                  const result = !isRental;
                  setIsRental(result);
                  setIsSale(!result);
                }}
              />
              <label htmlFor="is_rental" className="text-sm">
                ქირავდება
              </label>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center items-start flex-col gap-5">
          <h3 className="font-[500] text-[16px] leading-[19.54px] text-[#1A1A1F]">
            მდებარეობა
          </h3>
          <div className="w-full flex justify-between items-center gap-[20px]">
            <div className="max-w-[384px] w-full flex justify-center items-start flex-col gap-2">
              <label className="font-[500] text-[14px] leading-[16.8px]">
                მისამართი *
              </label>
              <input
                type="text"
                {...register("address", { required: "მინიმუმ 2 სიმბოლო" })}
                className={`w-full rounded-[6px] border-[1px] ${
                  errors.address ? "border-[#F93B1D]" : "border-[#808a93]"
                } p-[10px]`}
              />
              {errors.address && (
                <span className="text-[12px] leading-[14.4px] font-[400] text-[#F93B1D]">
                  {errors.address.message}
                </span>
              )}
            </div>

            <div className="max-w-[384px] w-full flex justify-center items-start flex-col gap-2">
              <label className="font-[500] text-[14px] leading-[16.8px]">
                საფოსტო ინდექსი *
              </label>
              <input
                type="number"
                {...register("zip_code", {
                  valueAsNumber: true,
                  required: "მხოლოდ რიცხვები",
                })}
                className={`w-full rounded-[6px] border-[1px] ${
                  errors.zip_code ? "border-[#F93B1D]" : "border-[#808a93]"
                } p-[10px]`}
              />
              {errors.zip_code && (
                <span className=" text-[12px] leading-[14.4px] font-[400] text-[#F93B1D]">
                  {errors.zip_code.message}
                </span>
              )}
            </div>
          </div>

          <div className="w-full flex justify-between items-center gap-[20px]">
            <div className="max-w-[384px] w-full flex justify-center items-start flex-col gap-2">
              <label className="font-[500] text-[14px] leading-[16.8px]">
                რეგიონი
              </label>
              <select
                {...register("region_id", { required: "აირჩიეთ რეგიონი" })}
                onChange={(e) => setRegion(parseInt(e.target.value))}
                className={`w-full rounded-[6px] border-[1px] ${
                  errors.region_id ? "border-[#F93B1D]" : "border-[#808a93]"
                } p-[10px]`}
              >
                <option value="">აირჩიეთ რეგიონი</option>
                {regions.map((region: { id: number; name: string }) => (
                  <option key={region.id} value={region.id}>
                    {region.name}
                  </option>
                ))}
              </select>
              {errors.region_id && (
                <span className=" text-[12px] leading-[14.4px] font-[400] text-[#F93B1D]">
                  {errors.region_id.message}
                </span>
              )}
            </div>

            {region && (
              <div className="max-w-[384px] w-full flex justify-center items-start flex-col gap-2">
                <label className="font-[500] text-[14px] leading-[16.8px]">
                  ქალაქი
                </label>
                <select
                  {...register("city_id", { required: "აირჩიეთ ქალაქი" })}
                  className={`w-full rounded-[6px] border-[1px] ${
                    errors.city_id ? "border-[#F93B1D]" : "border-[#808a93]"
                  } p-[10px]`}
                >
                  <option value="">აირჩიეთ ქალაქი</option>
                  {cities.map((city: { id: number; name: string }) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </select>
                {errors.city_id && (
                  <span className=" text-[12px] leading-[14.4px] font-[400] text-[#F93B1D]">
                    {errors.city_id.message}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="w-full flex justify-center items-start flex-col gap-5">
          <h3 className="font-[500] text-[16px] leading-[19.54px] text-[#1A1A1F]">
            დეტალები
          </h3>
          <div className="w-full flex justify-between items-center gap-[20px]">
            <div className="max-w-[384px] w-full flex justify-center items-start flex-col gap-2">
              <label className="font-[500] text-[14px] leading-[16.8px]">
                ფასი *
              </label>
              <input
                type="number"
                {...register("price", {
                  valueAsNumber: true,
                  required: "ფასი არის სავალდებულო",
                })}
                className={`w-full rounded-[6px] border-[1px] ${
                  errors.price ? "border-[#F93B1D]" : "border-[#808a93]"
                } p-[10px]`}
              />
              {errors.price && (
                <span className="text-[12px] leading-[14.4px] font-[400] text-[#F93B1D]">
                  {errors.price.message}
                </span>
              )}
            </div>

            <div className="max-w-[384px] w-full flex justify-center items-start flex-col gap-2">
              <label className="font-[500] text-[14px] leading-[16.8px]">
                ფართი *
              </label>
              <input
                type="number"
                {...register("area", {
                  valueAsNumber: true,
                  required: "მხოლოდ რიცხვები",
                })}
                className={`w-full rounded-[6px] border-[1px] ${
                  errors.area ? "border-[#F93B1D]" : "border-[#808a93]"
                } p-[10px]`}
              />
              {errors.area && (
                <span className=" text-[12px] leading-[14.4px] font-[400] text-[#F93B1D]">
                  {errors.area.message}
                </span>
              )}
            </div>
          </div>

          <div className="w-full flex justify-between items-center gap-[20px]">
            <div className="max-w-[384px] w-full flex justify-center items-start flex-col gap-2">
              <label className="font-[500] text-[14px] leading-[16.8px]">
                საძინებლების რაოდენობა *
              </label>
              <input
                type="number"
                {...register("bedrooms", {
                  valueAsNumber: true,
                  required: "მხოლოდ რიცხვები",
                })}
                className={`w-full rounded-[6px] border-[1px] ${
                  errors.bedrooms ? "border-[#F93B1D]" : "border-[#808a93]"
                } p-[10px]`}
              />
              {errors.bedrooms && (
                <span className=" text-[12px] leading-[14.4px] font-[400] text-[#F93B1D]">
                  {errors.bedrooms.message}
                </span>
              )}
            </div>

            <div className="max-w-[384px] w-full flex justify-center items-start flex-col gap-2">
              <label className="font-[500] text-[14px] leading-[16.8px]">
                აგენტი
              </label>
              <select
                {...register("agent_id", { required: "აირჩიეთ აგენტი" })}
                className={`w-full rounded-[6px] border-[1px] ${
                  errors.agent_id ? "border-[#F93B1D]" : "border-[#808a93]"
                } p-[10px]`}
              >
                <option value="">აირჩიეთ აგენტი</option>
                {agents.map((agent: { id: number; name: string }) => (
                  <option key={agent.id} value={agent.id}>
                    {agent.name}
                  </option>
                ))}
              </select>
              {errors.agent_id && (
                <span className=" text-[12px] leading-[14.4px] font-[400] text-[#F93B1D]">
                  {errors.agent_id.message}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center items-start flex-col gap-5">
          <h3 className="font-[500] text-[16px] leading-[19.54px] text-[#1A1A1F]">
            სურათი
          </h3>
          <div className="flex justify-center items-center gap-5">
            <button
              type="button"
              onClick={handleButtonClick}
              className="flex justify-center items-center w-[160px] h-[160px] border-[1px] border-[#808a93] rounded-[6px] bg-[#F5F6F8]"
            >
              {getValues("image")[0] ? (
                <img
                  src={URL.createObjectURL(getValues("image")[0])}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-[6px]"
                />
              ) : (
                <span className="text-[14px] leading-[16.8px] text-[#8E9DAB]">
                  მოაწყეთ სურათი
                </span>
              )}
            </button>
            <input
              type="file"
              accept="image/*"
              {...register("image", { required: "სურათი სავალდებულოა" })}
              ref={fileInputRef}
              className="hidden"
              onChange={(e) => setValue("image", e.target.files)}
            />
            {errors.image && (
              <span className="text-[12px] leading-[14.4px] font-[400] text-[#F93B1D]">
                {errors.image.message}
              </span>
            )}
          </div>
        </div>

        <div className="w-full flex justify-center items-center mt-[20px]">
          <button
            type="submit"
            className="bg-[#1A1A1F] text-white py-[12px] px-[20px] rounded-[6px] text-[16px] leading-[19.54px]"
          >
            გაგზავნა
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateRealEstate;
