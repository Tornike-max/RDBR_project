import { useRef } from "react";
import {
  UseFormRegister,
  FieldErrors,
  UseFormTrigger,
  UseFormSetError,
  UseFormClearErrors,
} from "react-hook-form";
import { CreateRealEstateInterface } from "../../types/types";
import { HiMiniCheck, HiOutlinePlusCircle } from "react-icons/hi2";

type FileUploadTypes = {
  selectedImage: File | string | null;
  setSelectedImage: (file: File | string | null) => void;
  register: UseFormRegister<CreateRealEstateInterface>;
  errors: FieldErrors<CreateRealEstateInterface>;
  trigger: UseFormTrigger<CreateRealEstateInterface>;
  setError: UseFormSetError<CreateRealEstateInterface>;
  clearErrors: UseFormClearErrors<CreateRealEstateInterface>;
};

const FileUpload = ({
  selectedImage,
  setSelectedImage,
  register,
  errors,
  setError,
  trigger,
  clearErrors,
}: FileUploadTypes) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { ref } = register("image", { required: "სავალდებულოა" });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const maxSizeInMB = 1 * 1024 * 1024;
    if (file) {
      if (file.size > maxSizeInMB) {
        setError("image", {
          type: "manual",
          message: "ფაილის ზომა არ უნდა აღემატებოდეს 1MB-ს",
        });
        setSelectedImage(null);
        return;
      }
      clearErrors("image");

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result as string;
        setSelectedImage(base64Image);
        localStorage.setItem("uploadedImage", base64Image);
      };
      reader.readAsDataURL(file);
    }
    trigger("image");
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full flex flex-col justify-center items-start gap-2">
      <label className="font-firago font-medium text-[14px] leading-[16.8px] text-[#021526]">
        ატვირთეთ ფოტო *
      </label>
      <div className="w-full relative m-auto rounded-[8px] border-[1px] border-[#808A93] border-dashed h-[120px] flex justify-center items-center">
        <input
          type="file"
          accept="image/*"
          {...register("image", {
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
        >
          <HiOutlinePlusCircle className="w-[20px] h-[20px] text-[#2D3648] text-lg" />
        </button>
      </div>

      {errors.image && (
        <div className="w-full flex justify-start items-center gap-1 font-firago font-normal text-[14px] leading-[16.8px] text-[#F93B1D]">
          <HiMiniCheck className="text-xl" />
          <p>{errors.image.message}</p>
        </div>
      )}

      {selectedImage && (
        <div className="relative w-full">
          <div className="w-full relative m-auto rounded-[8px] border-[1px] border-[#808A93] border-dashed h-[120px] p-4 flex justify-start items-center gap-4">
            <div className="relative w-[92px] h-[82px] m-auto">
              <img
                src={
                  typeof selectedImage === "string"
                    ? selectedImage
                    : URL.createObjectURL(selectedImage)
                }
                alt="Selected"
                className="w-full h-full object-cover rounded-[4px]"
              />
              <img
                src="/icons/trash.png"
                alt="Trash Icon"
                onClick={() => {
                  setSelectedImage(null);
                  localStorage.removeItem("uploadedImage");
                }}
                className="absolute bottom-[-7px] right-[-7px] cursor-pointer p-1 bg-[#FFFFFF] border-[1px] border-[#021526] rounded-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
