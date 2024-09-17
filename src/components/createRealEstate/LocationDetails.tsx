import {
  UseFormRegister,
  FieldErrors,
  UseFormGetValues,
  UseFormTrigger,
} from "react-hook-form";
import { CreateRealEstateInterface } from "../../types/types";

type LocationTypes = {
  register: UseFormRegister<CreateRealEstateInterface>;
  errors: FieldErrors<CreateRealEstateInterface>;
  region: number | "";
  setRegion: (region: number) => void;
  regions: { id: number; name: string }[];
  cities: { id: number; name: string }[];
  getValues: UseFormGetValues<CreateRealEstateInterface>;
  trigger: UseFormTrigger<CreateRealEstateInterface>;
};

const LocationDetails = ({
  register,
  errors,
  region,
  setRegion,
  regions,
  cities,
  getValues,
  trigger,
}: LocationTypes) => {
  return (
    <div className="w-full flex justify-center items-start flex-col gap-5">
      <h3 className="font-[500] text-[16px] leading-[19.54px] text-[#1A1A1F]">
        მდებარეობა
      </h3>
      <div className="w-full flex justify-between items-center gap-[20px]">
        <div className="max-w-[384px] w-full flex justify-center items-start flex-col gap-2">
          <label className="font-[500] text-[14px] leading-[16.8px] text-[#021526]">
            მისამართი *
          </label>
          <input
            type="text"
            {...register("address", {
              required: "სავალდებულოა",
              minLength: {
                value: 2,
                message: "მინიმუმ 2 სიმბოლო",
              },
            })}
            onChange={() => trigger("address")}
            className={`w-full rounded-[6px] border-[1px] ${
              errors.address ? "border-[#F93B1D]" : "border-[#808a93]"
            } p-[10px]`}
          />

          {!errors.address && getValues("address")?.length < 2 && (
            <div className="w-full flex justify-start items-center gap-1 font-[400] text-[14px] text-[#021526] leading-[16.8px]">
              <img src="/icons/check.png" alt="check icon" />
              <p>გამოიყენეთ @redberry.ge ფოსტა</p>
            </div>
          )}
          {!errors.address && getValues("address")?.length >= 2 && (
            <div className="w-full flex justify-start items-center gap-1 font-[400] text-[14px] text-green-500 leading-[16.8px]">
              <img src="/icons/check.png" alt="check icon" />
              <p>გამოიყენეთ @redberry.ge ფოსტა</p>
            </div>
          )}
          {errors.address && (
            <span className="text-[12px] leading-[14.4px] font-[400] text-[#F93B1D]">
              <div className="w-full flex justify-start items-center gap-1 font-[400] text-[14px] leading-[16.8px]">
                <img src="/icons/check.png" alt="check icon" />
                <p>{errors.address.message}</p>
              </div>
            </span>
          )}
        </div>

        <div className="max-w-[384px] w-full flex justify-center items-start flex-col gap-2">
          <label className="font-[500] text-[14px] leading-[16.8px] text-[#021526]">
            საფოსტო ინდექსი *
          </label>
          <input
            type="number"
            {...register("zip_code", {
              required: "სავალდებულოა",
              pattern: {
                value: /^[0-9]+$/,
                message: "მხოლოდ რიცხვები",
              },
            })}
            onChange={() => trigger("zip_code")}
            className={`w-full rounded-[6px] border-[1px] ${
              errors.zip_code ? "border-[#F93B1D]" : "border-[#808a93]"
            } p-[10px]`}
          />

          {!errors.zip_code && getValues("zip_code")?.length < 2 && (
            <div className="w-full flex justify-start items-center gap-1 font-[400] text-[14px] text-[#021526] leading-[16.8px]">
              <img src="/icons/check.png" alt="check icon" />
              <p>მინიმუმ 2 სიმბოლო</p>
            </div>
          )}
          {!errors.zip_code && getValues("zip_code")?.length >= 2 && (
            <div className="w-full flex justify-start items-center gap-1 font-[400] text-[14px] text-green-500 leading-[16.8px]">
              <img src="/icons/check.png" alt="check icon" />
              <p>მხოლოდ რიცხვები</p>
            </div>
          )}
          {errors.zip_code && (
            <span className="text-[12px] leading-[14.4px] font-[400] text-[#F93B1D]">
              <div className="w-full flex justify-start items-center gap-1 font-[400] text-[14px] leading-[16.8px]">
                <img src="/icons/check.png" alt="check icon" />
                <p>{errors.zip_code.message}</p>
              </div>
            </span>
          )}
        </div>
      </div>

      <div className="w-full flex justify-between items-center gap-[20px]">
        <div className="max-w-[384px] w-full flex justify-center items-start flex-col gap-2">
          <label className="font-[500] text-[14px] leading-[16.8px] text-[#021526]">
            რეგიონი
          </label>
          <select
            {...register("region_id", { required: "აირჩიეთ რეგიონი" })}
            onChange={(e) => {
              setRegion(parseInt(e.target.value));
              trigger("region_id");
            }}
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
            <span className="text-[12px] leading-[14.4px] font-[400] text-[#F93B1D]">
              <div className="w-full flex justify-start items-center gap-1 font-[400] text-[14px] leading-[16.8px]">
                <img src="/icons/check.png" alt="check icon" />
                <p>{errors.region_id.message}</p>
              </div>
            </span>
          )}
        </div>

        {region ? (
          <div className="max-w-[384px] w-full flex justify-center items-start flex-col gap-2">
            <label className="font-[500] text-[14px] leading-[16.8px] text-[#021526]">
              ქალაქი
            </label>
            <select
              {...register("city_id", { required: "აირჩიეთ ქალაქი" })}
              onChange={() => trigger("city_id")}
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
              <span className="text-[12px] leading-[14.4px] font-[400] text-[#F93B1D]">
                <div className="w-full flex justify-start items-center gap-1 font-[400] text-[14px] leading-[16.8px]">
                  <img src="/icons/check.png" alt="check icon" />
                  <p>{errors.city_id.message}</p>
                </div>
              </span>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default LocationDetails;
