import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useStoreAgent } from "../../hooks/useStoreAgent";
import { CreateAgentInterface } from "../../types/types";
import NameSurnameInputs from "./NameSurnameInputs";
import EmailPhoneInputs from "./EmailPhoneInputs";
import UploadImage from "./UploadImage";
import Button from "../../ui/Button";
import SecondaryButton from "../../ui/SecondaryButton";

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
          <h3 className="font-firago font-medium text-[32px] leading-[38.4px] text-[#021526] text-center mb-[40px]">
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
            <SecondaryButton onClick={() => setIsAgentModalOpen(false)}>
              გაუქმება
            </SecondaryButton>
            <Button type="submit" isPending={isPending}>
              {isPending ? "დაელოდეთ..." : "დამატება"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAgentModal;
