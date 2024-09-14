import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { realEstateSchema } from "../schema/zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { useStoreRealEstate } from "../hooks/useStoreRealEstate";
import { useGerRegions } from "../hooks/useGetRegions";
import { useGerCities } from "../hooks/useGetCities";
import { useGetAgents } from "../hooks/useGetAgents";

type FormData = z.infer<typeof realEstateSchema>;

const CreateRealEstate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormData>({
    resolver: zodResolver(realEstateSchema),
  });
  const [region, setRegion] = useState("");
  const [isRental, setIsRental] = useState(false);
  const [isSale, setIsSale] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data, isPending } = useGerRegions();
  const { cities, isCitiesPending } = useGerCities();
  const { agents, isAgentsPending } = useGetAgents();

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const { ref, ...rest } = register("image");

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const newData = { ...data, is_rental: isRental ? true : false };
    console.log(newData);
  };

  if (isPending || isCitiesPending || isAgentsPending) return <p>Loading...</p>;

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
                onChange={() =>
                  setIsSale((sale) => {
                    const result = !sale;
                    setIsRental(result === true ? false : true);
                    return result;
                  })
                }
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
                onChange={() =>
                  setIsRental((rent) => {
                    const result = !rent;
                    setIsSale(result === true ? false : true);
                    return result;
                  })
                }
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
                {...register("address")}
                className={`w-full rounded-[6px] border-[1px] ${
                  errors.address ? "border-[#F93B1D]" : "border-[#808a93]"
                } p-[10px]`}
              />

              {(getValues("address") || "").length === 0 ? (
                <div className="flex items-center gap-2 text-[14px] leading-[16.8px] font-[400] text-[#021526]">
                  <img src="/icons/check.png" alt="check" />
                  <span>მინიმუმ 2 სიმბოლო</span>
                </div>
              ) : errors.address ? (
                <span className="text-[12px] leading-[14.4px] font-[400] text-[#F93B1D]">
                  {errors.address.message}
                </span>
              ) : (
                <div className="flex items-center gap-2 text-[14px] leading-[16.8px] font-[400] text-[#45A849]">
                  <img src="/icons/check.png" alt="check" />
                  <span>მინიმუმ 2 სიმბოლო</span>
                </div>
              )}
            </div>

            <div className="max-w-[384px] w-full flex justify-center items-start flex-col gap-2">
              <label className="font-[500] text-[14px] leading-[16.8px]">
                საფოსტო ინდექსი *
              </label>
              <input
                type="number"
                {...register("zip_code")}
                className={`w-full rounded-[6px] border-[1px] ${
                  errors.zip_code?.message
                    ? "border-[#F93B1D]"
                    : "border-[#808a93]"
                } p-[10px]`}
              />
              <div className="flex items-center gap-2 text-[14px] leading-[16.8px] font-[400] text-[#021526]">
                <img src="/icons/check.png" alt="check" />
                <span>მხოლოდ რიცხვები</span>
              </div>
              {errors.zip_code?.message && (
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
                {...register("region_id")}
                onChange={(e) => setRegion(e.target.value)}
                className={`w-full rounded-[6px] border-[1px] ${
                  errors.region_id?.message
                    ? "border-[#F93B1D]"
                    : "border-[#808a93]"
                } p-[10px]`}
              >
                {data.map((region: { id: number; name: string }) => (
                  <option key={region.id}>{region.name}</option>
                ))}
              </select>
              {errors.region_id?.message && (
                <span className=" text-[12px] leading-[14.4px] font-[400] text-[#F93B1D]">
                  {errors.region_id.message}
                </span>
              )}
            </div>

            {region !== "" && (
              <div className="max-w-[384px] w-full flex justify-center items-start flex-col gap-2">
                <label className="font-[500] text-[14px] leading-[16.8px]">
                  ქალაქი
                </label>
                <select
                  {...register("city_id")}
                  className={`w-full rounded-[6px] border-[1px] ${
                    errors.city_id?.message
                      ? "border-[#F93B1D]"
                      : "border-[#808a93]"
                  } p-[10px]`}
                >
                  {cities.map((city: { id: number; name: string }) => (
                    <option key={city.id}>{city.name}</option>
                  ))}
                </select>
                {errors.city_id?.message && (
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
            ბინის დეტალები
          </h3>
          <div className="w-full flex justify-between items-center gap-[20px]">
            <div className="max-w-[384px] w-full flex justify-center items-start flex-col gap-2">
              <label className="font-[500] text-[14px] leading-[16.8px]">
                ფასი
              </label>
              <input
                type="number"
                {...register("price")}
                className={`w-full rounded-[6px] border-[1px] ${
                  errors.price?.message
                    ? "border-[#F93B1D]"
                    : "border-[#808a93]"
                } p-[10px]`}
              />
              <div className="flex items-center gap-2 text-[14px] leading-[16.8px] font-[400] text-[#021526]">
                <img src="/icons/check.png" alt="check" />
                <span>მხოლოდ რიცხვები</span>
              </div>
              {errors.price?.message && (
                <span className=" text-[12px] leading-[14.4px] font-[400] text-[#F93B1D]">
                  {errors.price.message}
                </span>
              )}
            </div>

            <div className="max-w-[384px] w-full flex justify-center items-start flex-col gap-2">
              <label className="font-[500] text-[14px] leading-[16.8px]">
                ფართობი
              </label>
              <input
                type="number"
                {...register("area")}
                className={`w-full rounded-[6px] border-[1px] ${
                  errors.area?.message ? "border-[#F93B1D]" : "border-[#808a93]"
                } p-[10px]`}
              />
              <div className="flex items-center gap-2 text-[14px] leading-[16.8px] font-[400] text-[#021526]">
                <img src="/icons/check.png" alt="check" />
                <span>მხოლოდ რიცხვები</span>
              </div>
              {errors.area?.message && (
                <span className=" text-[12px] leading-[14.4px] font-[400] text-[#F93B1D]">
                  {errors.area.message}
                </span>
              )}
            </div>
          </div>

          <div className="w-full flex justify-between items-center ">
            <div className="max-w-[384px] w-full flex justify-center items-start flex-col gap-2">
              <label className="font-[500] text-[14px] leading-[16.8px]">
                საძინებლების რაოდენობა
              </label>
              <input
                {...register("bedrooms")}
                type="number"
                className={`w-full rounded-[6px] border-[1px] ${
                  errors.bedrooms?.message
                    ? "border-[#F93B1D]"
                    : "border-[#808a93]"
                } p-[10px]`}
              />
              <div className="flex items-center gap-2 text-[14px] leading-[16.8px] font-[400] text-[#021526]">
                <img src="/icons/check.png" alt="check" />
                <span>მხოლოდ რიცხვები</span>
              </div>
              {errors.bedrooms?.message && (
                <span className=" text-[12px] leading-[14.4px] font-[400] text-[#F93B1D]">
                  {errors.bedrooms.message}
                </span>
              )}
            </div>
          </div>

          <div className="w-full flex justify-center items-center">
            <div className="w-full flex justify-center items-start flex-col gap-2">
              <label className="font-[500] text-[14px] leading-[16.8px]">
                აღწერა
              </label>
              <textarea
                {...register("description")}
                className="w-full h-[135px] rounded-[6px] border-[1px] border-[#808A93] p-[10px]"
              ></textarea>
              <div className="flex items-center gap-2 text-[14px] leading-[16.8px] font-[400] text-[#021526]">
                <img src="/icons/check.png" alt="check" />
                <span>მინიმუმ 5 სიტყვა</span>
              </div>
              {errors.description?.message && (
                <span className=" text-[12px] leading-[14.4px] font-[400] text-[#F93B1D]">
                  {errors.description.message}
                </span>
              )}
            </div>
          </div>

          <div className="w-full flex justify-center items-center">
            <div className="w-full flex justify-center items-start flex-col gap-2">
              <label className="font-[500] text-[14px] leading-[16.8px]">
                ატვირთე ფოტო *
              </label>
              <div className="relative w-full h-[135px] rounded-[6px] border-[1px] border-[#808A93] border-dashed p-[10px] flex items-center justify-center">
                <input
                  type="file"
                  {...register("image")}
                  ref={(e) => {
                    ref(e);
                    fileInputRef.current = e;
                  }}
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  {...rest}
                />
                <button
                  type="button"
                  onClick={handleButtonClick}
                  className="file-input-icon w-[20px] h-[20px] rounded-full border-[1px] border-[#2D3648] flex justify-center items-center cursor-pointer"
                >
                  +
                </button>
              </div>
              {errors.image?.message && (
                <span className=" text-[12px] leading-[14.4px] font-[400] text-[#F93B1D]">
                  {errors.image.message}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center items-start flex-col gap-5">
          <h3 className="font-[500] text-[16px] leading-[19.54px] text-[#1A1A1F]">
            აგენტი
          </h3>
          <div className="w-full flex justify-between items-center gap-[20px]">
            <div className="max-w-[384px] w-full flex justify-center items-start flex-col gap-2">
              <label className="font-[500] text-[14px] leading-[16.8px]">
                აირჩიე
              </label>
              <select
                {...register("agent_id")}
                className={`w-full rounded-[6px] border-[1px] ${
                  errors.address?.message
                    ? "border-[#F93B1D]"
                    : "border-[#808a93]"
                } p-[10px]`}
              >
                {agents.map((agent: { id: number; name: string }) => (
                  <option key={agent.id}>{agent.name}</option>
                ))}
              </select>
              {errors.agent_id?.message && (
                <span className=" text-[12px] leading-[14.4px] font-[400] text-[#F93B1D]">
                  {errors.agent_id.message}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end items-center gap-[15px] ">
          <button
            type="button"
            className="rounded-[10px] border-[1px] border-[#F93B1D] text-[#F93B1D] hover:bg-[#F93B1D] hover:text-[#FFFFFF] text-[16px] leading-[19.2px] font-[500] text-center py-[10px] px-[16px] duration-200 transition-all ease-in-out"
          >
            გაუქმება
          </button>
          <button
            className="rounded-[10px] border-[1px] bg-[#F93B1D] text-[#FFFFFF] border-[#F93B1D] hover:bg-[#DF3014] text-[16px] leading-[19.2px] font-[500] text-center py-[10px] px-[16px] duration-200 transition-all ease-in-out"
            type="submit"
          >
            დაამატე ლისტინგი
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateRealEstate;
