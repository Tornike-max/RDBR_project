import {
  UseFormRegister,
  UseFormTrigger,
  UseFormWatch,
  FieldErrors,
} from "react-hook-form";
import { CreateAgentInterface } from "../../types/types";
import { HiMiniCheck } from "react-icons/hi2";

type FormTypes = {
  register: UseFormRegister<CreateAgentInterface>;
  trigger: UseFormTrigger<CreateAgentInterface>;
  watch: UseFormWatch<CreateAgentInterface>;
  errors: FieldErrors<CreateAgentInterface>;
};
const EmailPhoneInputs = ({ register, trigger, watch, errors }: FormTypes) => {
  return (
    <div className="w-full flex justify-between items-center gap-[20px]">
      <div className="w-full flex flex-col justify-center items-start gap-2">
        <label className="font-firago font-medium text-[14px] leading-[16.8px]">
          ელ-ფოსტა *
        </label>
        <input
          type="email"
          {...register("email", {
            required: "ელ-ფოსტა სავალდებულოა",
            validate: {
              endsWithExample: (value) =>
                value.endsWith("@redberry.ge") ||
                'ელ-ფოსტა უნდა მთავრდებოდეს @redberry.ge-თ"',
            },
          })}
          className={`w-full rounded-[6px] border-[1px] ${
            errors.email ? "border-[#F93B1D]" : "border-[#808a93]"
          }  p-[10px]`}
          onBlur={() => trigger("email")}
        />

        {!watch("email") && !errors.email && (
          <div className="w-full flex justify-start items-center gap-1 font-firago font-normal text-[14px] text-[#021526] leading-[16.8px]">
            <HiMiniCheck className="text-xl" />
            <p>გამოიყენეთ @redberry.ge ფოსტა</p>
          </div>
        )}

        {watch("email")?.length >= 2 && !errors.email && (
          <div className="w-full flex justify-start items-center gap-1 font-firago font-normal text-[14px] text-green-500 leading-[16.8px]">
            <HiMiniCheck className="text-xl" />
            <p>გამოიყენეთ @redberry.ge ფოსტა</p>
          </div>
        )}

        {errors.email && (
          <div className="w-full flex justify-start items-center gap-1 font-firago font-normal text-[14px] leading-[16.8px] text-[#F93B1D]">
            <HiMiniCheck className="text-xl" />
            <p>{errors.email.message}</p>
          </div>
        )}
      </div>

      <div className="w-full flex flex-col justify-center items-start gap-2">
        <label className="font-firago font-medium text-[14px] leading-[16.8px]">
          ტელეფონის ნომერი
        </label>
        <input
          {...register("phone", {
            required: "ტელეფონის ნომერი სავალდებულოა",
            pattern: {
              value: /^5\d{8}$/,
              message: "ტელეფონის ნომერი უნდა იყოს ამ ფორმატის 5XXXXXXXX",
            },
          })}
          type="text"
          className={`w-full rounded-[6px] border-[1px] ${
            errors.phone ? "border-[#F93B1D]" : "border-[#808a93]"
          }  p-[10px]`}
          onBlur={() => trigger("phone")}
        />
        {!watch("phone") && !errors.phone && (
          <div className="w-full flex justify-start items-center gap-1 font-firago font-normal text-[14px] text-[#021526] leading-[16.8px]">
            <HiMiniCheck className="text-xl" />
            <p>მხოლოდ რიცხვები</p>
          </div>
        )}

        {watch("phone") && !errors.phone && (
          <div className="w-full flex justify-start items-center gap-1 font-firago font-normal text-[14px] text-green-500 leading-[16.8px]">
            <HiMiniCheck className="text-xl" />
            <p>მხოლოდ რიცხვები</p>
          </div>
        )}

        {errors.phone && (
          <div className="w-full flex justify-start items-center gap-1 font-firago font-normal text-[14px] leading-[16.8px] text-[#F93B1D]">
            <HiMiniCheck className="text-xl" />
            <p>{errors.phone.message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailPhoneInputs;
