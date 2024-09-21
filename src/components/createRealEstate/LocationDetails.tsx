import {
  UseFormRegister,
  FieldErrors,
  UseFormTrigger,
  UseFormWatch,
  UseFormSetValue,
} from "react-hook-form";
import { CreateRealEstateInterface } from "../../types/types";
import { HiMiniCheck } from "react-icons/hi2";

type LocationTypes = {
  register: UseFormRegister<CreateRealEstateInterface>;
  errors: FieldErrors<CreateRealEstateInterface>;
  region: number | "";
  setRegion: (region: number) => void;
  regions: { id: number; name: string }[];
  cities: { id: number; name: string }[];
  trigger: UseFormTrigger<CreateRealEstateInterface>;
  watch: UseFormWatch<CreateRealEstateInterface>;
  setValue: UseFormSetValue<CreateRealEstateInterface>;
};

const LocationDetails = ({
  register,
  errors,
  region,
  setRegion,
  regions,
  cities,
  watch,
  setValue,
  trigger,
}: LocationTypes) => {
  return (
    <div className="w-full flex justify-center items-start flex-col gap-5">
      <h3 className="font-helvatica font-medium text-[16px] leading-[19.54px] text-[#1A1A1F]">
        მდებარეობა
      </h3>
      <div className="w-full flex justify-between items-center gap-[20px]">
        <div className="max-w-[384px] w-full flex justify-center items-start flex-col gap-2">
          <label className="font-firago font-medium text-[14px] leading-[16.8px] text-[#021526]">
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
            onBlur={() => trigger("address")}
            className={`w-full rounded-[6px] border-[1px] ${
              errors.address ? "border-[#F93B1D]" : "border-[#808a93]"
            } p-[10px]`}
          />

          {!watch("address") && !errors.address && (
            <div className="w-full flex justify-start items-center gap-1 font-firago font-normal text-[14px] text-[#021526] leading-[16.8px]">
              <HiMiniCheck className="text-xl" />
              <p>მინიმუმ 2 სიმბოლო</p>
            </div>
          )}

          {watch("address")?.length >= 2 && !errors.address && (
            <div className="w-full flex justify-start items-center gap-1 font-firago font-normal text-[14px] text-green-500 leading-[16.8px]">
              <HiMiniCheck className="text-xl" />
              <p>მინიმუმ 2 სიმბოლო</p>
            </div>
          )}

          {errors.address && (
            <div className="w-full flex justify-start items-center gap-1 font-firago font-normal text-[14px] leading-[16.8px] text-[#F93B1D]">
              <HiMiniCheck className="text-xl" />
              <p>{errors.address.message}</p>
            </div>
          )}
        </div>

        <div className="max-w-[384px] w-full flex justify-center items-start flex-col gap-2">
          <label className="font-firago font-medium text-[14px] leading-[16.8px] text-[#021526]">
            საფოსტო ინდექსი *
          </label>
          <input
            type="text"
            {...register("zip_code", {
              required: "სავალდებულოა",
              pattern: {
                value: /^[0-9]+$/,
                message: "მხოლოდ რიცხვები",
              },
            })}
            onBlur={() => trigger("zip_code")}
            className={`w-full rounded-[6px] border-[1px] ${
              errors.zip_code ? "border-[#F93B1D]" : "border-[#808a93]"
            } p-[10px]`}
          />

          {!watch("zip_code") && !errors.zip_code && (
            <div className="w-full flex justify-start items-center gap-1 font-firago font-normal text-[14px] text-[#021526] leading-[16.8px]">
              <HiMiniCheck className="text-xl" />
              <p>მხოლოდ რიცხვები</p>
            </div>
          )}

          {watch("zip_code")?.length > 0 && !errors.zip_code && (
            <div className="w-full flex justify-start items-center gap-1 font-firago font-normal text-[14px] text-green-500 leading-[16.8px]">
              <HiMiniCheck className="text-xl" />
              <p>მხოლოდ რიცხვები</p>
            </div>
          )}

          {errors.zip_code && (
            <div className="w-full flex justify-start items-center gap-1 font-firago font-normal text-[14px] leading-[16.8px] text-[#F93B1D]">
              <HiMiniCheck className="text-xl" />
              <p>{errors.zip_code.message}</p>
            </div>
          )}
        </div>
      </div>

      <div className="w-full flex justify-between items-center gap-[20px]">
        <div className="max-w-[384px] w-full flex justify-center items-start flex-col gap-2">
          <label className="font-firago font-medium text-[14px] leading-[16.8px] text-[#021526]">
            რეგიონი
          </label>
          <select
            {...register("region_id", { required: "აირჩიეთ რეგიონი" })}
            onChange={(e) => {
              setRegion(parseInt(e.target.value));
              setValue("region_id", parseInt(e.target.value));
            }}
            onBlur={() => trigger("region_id")}
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
            <div className="w-full flex justify-start items-center gap-1 font-firago font-normal text-[14px] leading-[16.8px] text-[#F93B1D]">
              <HiMiniCheck className="text-xl" />
              <p>{errors.region_id.message}</p>
            </div>
          )}
        </div>

        {region ? (
          <div className="max-w-[384px] w-full flex justify-center items-start flex-col gap-2">
            <label className="font-[500] text-[14px] leading-[16.8px] text-[#021526]">
              ქალაქი
            </label>
            <select
              {...register("city_id", { required: "აირჩიეთ ქალაქი" })}
              className={`w-full rounded-[6px] border-[1px] ${
                errors.city_id ? "border-[#F93B1D]" : "border-[#808a93]"
              } p-[10px]`}
              onBlur={() => trigger("city_id")}
            >
              <option value="">აირჩიეთ ქალაქი</option>
              {cities.map((city: { id: number; name: string }) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>

            {errors.city_id && (
              <div className="w-full flex justify-start items-center gap-1 font-firago font-normal text-[14px] leading-[16.8px] text-[#F93B1D]">
                <HiMiniCheck className="text-xl" />
                <p>{errors.city_id.message}</p>
              </div>
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
