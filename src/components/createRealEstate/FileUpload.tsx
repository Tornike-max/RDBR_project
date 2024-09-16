import { useRef } from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { CreateRealEstateInterface } from "../../types/types";

type FileUploadTypes = {
  selectedImage: File | null;
  setSelectedImage: (file: File | null) => void;
  register: UseFormRegister<CreateRealEstateInterface>;
  errors: FieldErrors<CreateRealEstateInterface>;
};

const FileUpload = ({
  selectedImage,
  setSelectedImage,
  register,
  errors,
}: FileUploadTypes) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { ref } = register("image");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
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
          onChange={handleFileChange}
        />
        <button
          type="button"
          onClick={handleButtonClick}
          aria-label="Upload image"
          className="file-input-icon w-[20px] h-[20px] rounded-full border-[1px] border-[#808A93] flex justify-center items-center cursor-pointer"
        >
          +
        </button>
      </div>
      {errors.image && (
        <div className="text-red-500">
          <span>{errors.image.message}</span>
        </div>
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
    </>
  );
};

export default FileUpload;
