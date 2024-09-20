import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useStoreAgent } from "../../hooks/useStoreAgent";
import { CreateAgentInterface } from "../../types/types";
import NameSurnameInputs from "./NameSurnameInputs";
import EmailPhoneInputs from "./EmailPhoneInputs";
import UploadImage from "./UploadImage";

const CreateAgentModal = ({
  setIsAgentModalOpen,
}: {
  setIsAgentModalOpen: (value: React.SetStateAction<boolean>) => void;
}) => {
  const backdropRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { storeAgent, isPending } = useStoreAgent();

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm<CreateAgentInterface>({ mode: "onChange" });

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === backdropRef.current) {
      setIsAgentModalOpen(false);
    }
  };

  const onSubmit: SubmitHandler<CreateAgentInterface> = (data) => {
    const validData = { ...data, avatar: selectedImage };
    storeAgent(validData, {
      onSuccess: () => {
        setIsAgentModalOpen(false);
      },
    });
  };

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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[799px]  m-auto flex justify-center items-center flex-col gap-[20px]"
        >
          <h3 className="font-[500] text-[32px] leading-[38.4px] text-[#021526] text-center mb-[40px]">
            აგენტის დამატება
          </h3>
          <NameSurnameInputs
            register={register}
            trigger={trigger}
            watch={watch}
            errors={errors}
          />

          <EmailPhoneInputs
            register={register}
            trigger={trigger}
            watch={watch}
            errors={errors}
          />

          <UploadImage
            register={register}
            errors={errors}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />

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
