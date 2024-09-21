import {
  UseFormRegister,
  FieldErrors,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form";
import { CreateRealEstateInterface } from "../../types/types";
import { HiMiniCheck } from "react-icons/hi2";

type DetailTypes = {
  register: UseFormRegister<CreateRealEstateInterface>;
  errors: FieldErrors<CreateRealEstateInterface>;
  trigger: UseFormTrigger<CreateRealEstateInterface>;
  watch: UseFormWatch<CreateRealEstateInterface>;
};

const Details = ({ register, errors, trigger, watch }: DetailTypes) => {
  return (
    <div className="w-full flex justify-center items-start flex-col gap-5">
      <h3 className="font-helvatica font-medium text-[16px] leading-[19.54px] text-[#1A1A1F]">
        დეტალები
      </h3>
      <div className="w-full flex justify-between items-center gap-[20px]">
        <div className="max-w-[384px] w-full flex justify-center items-start flex-col gap-2">
          <label className="font-firago font-medium text-[14px] leading-[16.8px] text-[#021526]">
            ფასი *
          </label>
          <input
            type="text"
            {...register("price", {
              required: "ფასი სავალდებულოა",
              pattern: {
                value: /^[0-9]+$/,
                message: "მხოლოდ რიცხვები",
              },
            })}
            className={`w-full rounded-[6px] border-[1px] ${
              errors.price ? "border-[#F93B1D]" : "border-[#808a93]"
            } p-[10px]`}
          />

          {!watch("price") && !errors.price && (
            <div className="w-full flex justify-start items-center gap-1 font-firago font-normal text-[14px] text-[#021526] leading-[16.8px]">
              <HiMiniCheck className="text-xl" />
              <p>მხოლოდ რიცხვები</p>
            </div>
          )}

          {watch("price") && !errors.price && (
            <div className="w-full flex justify-start items-center gap-1 font-firago font-normal text-[14px] text-green-500 leading-[16.8px]">
              <HiMiniCheck className="text-xl" />
              <p>მხოლოდ რიცხვები</p>
            </div>
          )}

          {errors.price && (
            <div className="w-full flex justify-start items-center gap-1 font-firago font-normal text-[14px] leading-[16.8px] text-[#F93B1D]">
              <HiMiniCheck className="text-xl" />
              <p>{errors.price.message}</p>
            </div>
          )}
        </div>

        <div className="max-w-[384px] w-full flex justify-center items-start flex-col gap-2">
          <label className="font-[500] text-[14px] leading-[16.8px] text-[#021526]">
            ფართობი *
          </label>
          <input
            type="text"
            {...register("area", {
              required: "ფართობი სავალდებულოა",
              pattern: {
                value: /^\d+([,.]\d+)?$/,
                message: "მხოლოდ რიცხვები",
              },
            })}
            onBlur={() => trigger("area")}
            className={`w-full rounded-[6px] border-[1px] ${
              errors.area ? "border-[#F93B1D]" : "border-[#808a93]"
            } p-[10px]`}
          />
          {!watch("area") && !errors.area && (
            <div className="w-full flex justify-start items-center gap-1 font-firago font-normal text-[14px] text-[#021526] leading-[16.8px]">
              <HiMiniCheck className="text-xl" />
              <p>მხოლოდ რიცხვები</p>
            </div>
          )}

          {watch("area") && !errors.area && (
            <div className="w-full flex justify-start items-center gap-1 font-firago font-normal text-[14px] text-green-500 leading-[16.8px]">
              <HiMiniCheck className="text-xl" />
              <p>მხოლოდ რიცხვები</p>
            </div>
          )}

          {errors.area && (
            <div className="w-full flex justify-start items-center gap-1 font-firago font-normal text-[14px] leading-[16.8px] text-[#F93B1D]">
              <HiMiniCheck className="text-xl" />
              <p>{errors.area.message}</p>
            </div>
          )}
        </div>
      </div>

      <div className="w-full flex justify-between items-center gap-[20px]">
        <div className="max-w-[384px] w-full flex justify-center items-start flex-col gap-2">
          <label className="font-[500] text-[14px] leading-[16.8px] text-[#021526]">
            საძინებლების რაოდენობა *
          </label>
          <input
            type="text"
            {...register("bedrooms", {
              required: "საძინებლების რაოდენობა სავალდებულოა",
              pattern: {
                value: /^[0-9]+$/,
                message: "მხოლოდ რიცხვები",
              },
            })}
            onBlur={() => trigger("bedrooms")}
            className={`w-full rounded-[6px] border-[1px] ${
              errors.bedrooms ? "border-[#F93B1D]" : "border-[#808a93]"
            } p-[10px]`}
          />
          {!watch("bedrooms") && !errors.bedrooms && (
            <div className="w-full flex justify-start items-center gap-1 font-firago font-normal text-[14px] text-[#021526] leading-[16.8px]">
              <HiMiniCheck className="text-xl" />
              <p>მხოლოდ რიცხვები</p>
            </div>
          )}

          {watch("bedrooms") && !errors.bedrooms && (
            <div className="w-full flex justify-start items-center gap-1 font-firago font-normal text-[14px] text-green-500 leading-[16.8px]">
              <HiMiniCheck className="text-xl" />
              <p>მხოლოდ რიცხვები</p>
            </div>
          )}

          {errors.bedrooms && (
            <div className="w-full flex justify-start items-center gap-1 font-firago font-normal text-[14px] leading-[16.8px] text-[#F93B1D]">
              <HiMiniCheck className="text-xl" />
              <p>{errors.bedrooms.message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Details;
