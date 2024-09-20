import {
  FieldErrors,
  UseFormRegister,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form";
import { CreateAgentInterface } from "../../types/types";

type FormTypes = {
  register: UseFormRegister<CreateAgentInterface>;
  trigger: UseFormTrigger<CreateAgentInterface>;
  watch: UseFormWatch<CreateAgentInterface>;
  errors: FieldErrors<CreateAgentInterface>;
};

const NameSurnameInputs = ({ register, trigger, watch, errors }: FormTypes) => {
  return (
    <div className="w-full flex justify-between items-center gap-[20px]">
      <div className="w-full flex flex-col justify-center items-start gap-2">
        <label className="font-[500] text-[14px] leading-[16.8px]">
          სახელი *
        </label>
        <input
          type="text"
          {...register("name", {
            required: "სახელი სავალდებულოა",
            validate: (val) =>
              val.length >= 2 || "სახელი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს",
          })}
          className="w-full rounded-[6px] border-[1px] border-[#808a93] p-[10px]"
          onBlur={() => trigger("name")}
        />
        {!watch("name") && !errors.name && (
          <div className="w-full flex justify-start items-center gap-1 font-[400] text-[14px] text-[#021526] leading-[16.8px]">
            <img src="/icons/check.png" alt="check icon" />
            <p>მინიმუმ 2 სიმბოლო</p>
          </div>
        )}

        {watch("name")?.length >= 2 && !errors.name && (
          <div className="w-full flex justify-start items-center gap-1 font-[400] text-[14px] text-green-500 leading-[16.8px]">
            <img src="/icons/check.png" alt="check icon" />
            <p>მინიმუმ 2 სიმბოლო</p>
          </div>
        )}

        {errors.name && (
          <span className="text-[12px] leading-[14.4px] font-[400] text-[#F93B1D]">
            <div className="w-full flex justify-start items-center gap-1 font-[400] text-[14px] leading-[16.8px]">
              <img src="/icons/check.png" alt="check icon" />
              <p>{errors.name.message}</p>
            </div>
          </span>
        )}
      </div>

      <div className="w-full flex flex-col justify-center items-start gap-2">
        <label className="font-[500] text-[14px] leading-[16.8px]">გვარი</label>
        <input
          type="text"
          {...register("surname", {
            required: "გვარი სავალდებულოა",
            validate: (val) =>
              val.length >= 2 || "გვარი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს",
          })}
          className="w-full rounded-[6px] border-[1px] border-[#808a93] p-[10px]"
          onBlur={() => trigger("surname")}
        />
        {!watch("surname") && !errors.surname && (
          <div className="w-full flex justify-start items-center gap-1 font-[400] text-[14px] text-[#021526] leading-[16.8px]">
            <img src="/icons/check.png" alt="check icon" />
            <p>მინიმუმ 2 სიმბოლო</p>
          </div>
        )}

        {watch("surname")?.length >= 2 && !errors.surname && (
          <div className="w-full flex justify-start items-center gap-1 font-[400] text-[14px] text-green-500 leading-[16.8px]">
            <img src="/icons/check.png" alt="check icon" />
            <p>მინიმუმ 2 სიმბოლო</p>
          </div>
        )}

        {errors.surname && (
          <span className="text-[12px] leading-[14.4px] font-[400] text-[#F93B1D]">
            <div className="w-full flex justify-start items-center gap-1 font-[400] text-[14px] leading-[16.8px]">
              <img src="/icons/check.png" alt="check icon" />
              <p>{errors.surname.message}</p>
            </div>
          </span>
        )}
      </div>
    </div>
  );
};

export default NameSurnameInputs;
