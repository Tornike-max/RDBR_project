import { useRef } from "react";
import { UseFormRegister, FieldErrors, UseFormTrigger } from "react-hook-form";
import { CreateRealEstateInterface } from "../../types/types";
import { HiOutlinePlusCircle } from "react-icons/hi2";

type FileUploadTypes = {
  selectedImage: File | null;
  setSelectedImage: (file: File | null) => void;
  register: UseFormRegister<CreateRealEstateInterface>;
  errors: FieldErrors<CreateRealEstateInterface>;
  trigger: UseFormTrigger<CreateRealEstateInterface>; // Trigger for manual validation
};

const FileUpload = ({
  selectedImage,
  setSelectedImage,
  register,
  errors,
  trigger,
}: FileUploadTypes) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { ref } = register("image", { required: "სავალდებულოა" });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
    }
    trigger("image"); // Manually trigger validation
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full flex flex-col justify-center items-start gap-2">
      <label className="font-[500] text-[14px] leading-[16.8px] text-[#021526]">
        ატვირთეთ ფოტო *
      </label>
      <div className="w-full relative m-auto rounded-[8px] border-[1px] border-[#808A93] border-dashed h-[120px] flex justify-center items-center">
        <input
          type="file"
          accept="image/*"
          {...register("image", { required: "სავალდებულოა" })}
          ref={(e) => {
            ref(e);
            fileInputRef.current = e;
          }}
          className="hidden"
          onChange={handleFileChange} // Trigger file change and validation
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
        <span className="text-[12px] leading-[14.4px] font-[400] text-[#F93B1D]">
          <div className="w-full flex justify-start items-center gap-1 font-[400] text-[14px] leading-[16.8px]">
            <img src="/icons/check.png" alt="check icon" />
            <p>{errors.image.message}</p>
          </div>
        </span>
      )}

      {selectedImage && (
        <div className="relative w-full">
          <div className="w-full relative m-auto rounded-[8px] border-[1px] border-[#808A93] border-dashed h-[120px] p-4 flex justify-start items-center gap-4">
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
    </div>
  );
};

export default FileUpload;
