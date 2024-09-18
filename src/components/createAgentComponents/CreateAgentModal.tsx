import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useStoreAgent } from "../../hooks/useStoreAgent";
import { useNavigate } from "react-router-dom";
import { CreateAgentInterface } from "../../types/types";

const CreateAgentModal = ({
  setIsAgentModalOpen,
}: {
  setIsAgentModalOpen: (value: React.SetStateAction<boolean>) => void;
}) => {
  const backdropRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { storeAgent, isPending } = useStoreAgent();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<CreateAgentInterface>({ mode: "onChange" });

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === backdropRef.current) {
      setIsAgentModalOpen(false);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const { ref } = register("avatar");

  const onSubmit: SubmitHandler<CreateAgentInterface> = (data) => {
    const validData = { ...data, avatar: selectedImage };
    storeAgent(validData, {
      onSuccess: () => {
        navigate("/");
      },
    });
  };

  console.log(getValues());

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50"
      ref={backdropRef}
      onClick={handleBackdropClick}
    >
      <div
        className="relative w-[1009px] h-[784px] bg-[#FFFFFF] p-6 rounded-[10px] flex flex-col justify-start items-center"
        style={{ boxShadow: "5px 5px 4px 0px #00000014" }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-[500] text-[32px] leading-[38.4px] text-[#021526] text-center mt-[80px]">
          აგენტის დამატება
        </h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[799px] m-auto flex justify-center items-center flex-col gap-[20px]"
        >
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
                    val.length >= 2 ||
                    "სახელი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს",
                })}
                className="w-full rounded-[6px] border-[1px] border-[#808a93] p-[10px]"
                onBlur={() => trigger("name")}
              />
              {!errors.name && getValues("name")?.length < 2 && (
                <div className="w-full flex justify-start items-center gap-1 font-[400] text-[14px] text-[#021526] leading-[16.8px]">
                  <img src="/icons/check.png" alt="check icon" />
                  <p>მინიმუმ 2 სიმბოლო</p>
                </div>
              )}
              {!errors.name && getValues("name")?.length >= 2 && (
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
              <label className="font-[500] text-[14px] leading-[16.8px]">
                გვარი
              </label>
              <input
                type="text"
                {...register("surname", {
                  required: "გვარი სავალდებულოა",
                  validate: (val) =>
                    val.length >= 2 ||
                    "გვარი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს",
                })}
                className="w-full rounded-[6px] border-[1px] border-[#808a93] p-[10px]"
                onBlur={() => trigger("surname")}
              />
              {!errors.surname && getValues("surname")?.length < 2 && (
                <div className="w-full flex justify-start items-center gap-1 font-[400] text-[14px] text-[#021526] leading-[16.8px]">
                  <img src="/icons/check.png" alt="check icon" />
                  <p>მინიმუმ 2 სიმბოლო</p>
                </div>
              )}
              {!errors.surname && getValues("surname")?.length >= 2 && (
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

          <div className="w-full flex justify-between items-center gap-[20px]">
            <div className="w-full flex flex-col justify-center items-start gap-2">
              <label className="font-[500] text-[14px] leading-[16.8px]">
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
                className="w-full rounded-[6px] border-[1px] border-[#808a93] p-[10px]"
                onBlur={() => trigger("email")}
              />
              {!errors.email && getValues("email")?.length < 2 && (
                <div className="w-full flex justify-start items-center gap-1 font-[400] text-[14px] text-[#021526] leading-[16.8px]">
                  <img src="/icons/check.png" alt="check icon" />
                  <p>გამოიყენეთ @redberry.ge ფოსტა</p>
                </div>
              )}
              {!errors.email && getValues("email")?.length >= 2 && (
                <div className="w-full flex justify-start items-center gap-1 font-[400] text-[14px] text-green-500 leading-[16.8px]">
                  <img src="/icons/check.png" alt="check icon" />
                  <p>გამოიყენეთ @redberry.ge ფოსტა</p>
                </div>
              )}
              {errors.email && (
                <span className="text-[12px] leading-[14.4px] font-[400] text-[#F93B1D]">
                  <div className="w-full flex justify-start items-center gap-1 font-[400] text-[14px] leading-[16.8px]">
                    <img src="/icons/check.png" alt="check icon" />
                    <p>{errors.email.message}</p>
                  </div>
                </span>
              )}
            </div>

            <div className="w-full flex flex-col justify-center items-start gap-2">
              <label className="font-[500] text-[14px] leading-[16.8px]">
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
                className="w-full rounded-[6px] border-[1px] border-[#808a93] p-[10px]"
                onBlur={() => trigger("phone")}
              />
              {!errors.phone && !getValues("phone") && (
                <div className="w-full flex justify-start items-center gap-1 font-[400] text-[14px] text-[#021526] leading-[16.8px]">
                  <img src="/icons/check.png" alt="check icon" />
                  <p>მხოლოდ რიცხვები</p>
                </div>
              )}
              {!errors.phone && getValues("phone") && (
                <div className="w-full flex justify-start items-center gap-1 font-[400] text-[14px] text-green-500 leading-[16.8px]">
                  <img src="/icons/check.png" alt="check icon" />
                  <p>მხოლოდ რიცხვები</p>
                </div>
              )}
              {errors.phone && (
                <span className="text-[12px] leading-[14.4px] font-[400] text-[#F93B1D]">
                  <div className="w-full flex justify-start items-center gap-1 font-[400] text-[14px] leading-[16.8px]">
                    <img src="/icons/check.png" alt="check icon" />
                    <p>{errors.phone.message}</p>
                  </div>
                </span>
              )}
            </div>
          </div>

          <div className="w-full relative m-auto rounded-[8px] border-[1px] border-[#2D3648] border-dashed h-[120px] flex justify-center items-center">
            <input
              type="file"
              accept="image/*"
              {...register("avatar", {
                required: "სავალდებულოა",
              })}
              ref={(e) => {
                ref(e);
                fileInputRef.current = e;
              }}
              className="hidden"
              onChange={handleFileChange}
            />
            <button
              type="button"
              onClick={handleButtonClick}
              aria-label="Upload image"
              className="file-input-icon w-[20px] h-[20px] rounded-full border-[1px] border-[#2D3648] flex justify-center items-center cursor-pointer"
            >
              +
            </button>
          </div>
          {errors?.avatar && (
            <div className="text-red-500">
              {errors.avatar && <span>{errors.avatar.message}</span>}
            </div>
          )}

          {selectedImage && (
            <div className="relative w-full">
              <div className="w-full relative m-auto rounded-[8px] border-[1px] border-[#2D3648] border-dashed h-[120px] p-4 flex justify-start items-center gap-4">
                <div className="relative w-[92px] h-[82px] m-auto">
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Selected"
                    className="w-full h-full object-cover rounded-[4px]"
                  />
                  <img
                    src="/icons/trash.png"
                    alt="Trash Icon"
                    onClick={() => setSelectedImage(null)}
                    className="absolute bottom-[-7px] right-[-7px] cursor-pointer p-1 bg-[#FFFFFF] border-[1px] border-[#021526] rounded-full"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="w-full flex justify-end items-center gap-[15px] mt-[60px]">
            <button
              type="button"
              className="rounded-[10px] border-[1px] border-[#F93B1D] text-[#F93B1D] hover:bg-[#F93B1D] hover:text-[#FFFFFF] text-[16px] leading-[19.2px] font-[500] text-center py-[10px] px-[16px] duration-200 transition-all ease-in-out"
              onClick={() => setIsAgentModalOpen(false)}
            >
              გაუქმება
            </button>
            <button
              type="submit"
              className="h-[47px] rounded-[10px]  border-[1px] text-[#FFFFFF] bg-[#F93B1D] hover:bg-[#DF3014] border-[#F93B1D] px-[16px] py-[10px] gap-[2px] flex items-center justify-center w-[203px]"
              disabled={isPending}
            >
              {isPending ? "დაელოდეთ..." : "დამატება"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAgentModal;
