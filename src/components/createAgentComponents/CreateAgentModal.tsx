import { useRef, useState } from "react";

const CreateAgentModal = ({
  setIsAgentModalOpen,
}: {
  setIsAgentModalOpen: (value: React.SetStateAction<boolean>) => void;
}) => {
  const backdropRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

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

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50"
      ref={backdropRef}
      onClick={handleBackdropClick}
    >
      <div
        className="relative w-[1009px] h-[784px] bg-[#FFFFFF] p-6 rounded-[10px] flex flex-col justify-start items-center"
        style={{ boxShadow: "5px 5px 4px 0px #00000014" }} // Custom shadow
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-[500] text-[32px] leading-[38.4px] text-[#021526] text-center mt-[80px]">
          აგენტის დამატება
        </h3>
        <form className="w-[799px] m-auto flex justify-center items-center flex-col gap-[20px]">
          <div className="w-full flex justify-between items-center gap-[20px]">
            {/* Name Input */}
            <div className="w-full flex flex-col justify-center items-start gap-2">
              <label className="font-[500] text-[14px] leading-[16.8px]">
                სახელი *
              </label>
              <input
                type="text" // Corrected to text type
                className="w-full rounded-[6px] border-[1px] border-[#808a93] p-[10px]"
              />
              <div className="flex items-center gap-2 text-[14px] leading-[16.8px] font-[400] text-[#021526]">
                <img src="/icons/check.png" alt="check" />
                <span>მინიმუმ 2 სიმბოლო</span>
              </div>
            </div>

            {/* Surname Input */}
            <div className="w-full flex flex-col justify-center items-start gap-2">
              <label className="font-[500] text-[14px] leading-[16.8px]">
                გვარი
              </label>
              <input
                type="text" // Corrected to text type
                className="w-full rounded-[6px] border-[1px] border-[#808a93] p-[10px]"
              />
              <div className="flex items-center gap-2 text-[14px] leading-[16.8px] font-[400] text-[#021526]">
                <img src="/icons/check.png" alt="check" />
                <span>მინიმუმ 2 სიმბოლო</span>
              </div>
            </div>
          </div>
          {/* Email and Phone */}
          <div className="w-full flex justify-between items-center gap-[20px]">
            <div className="w-full flex flex-col justify-center items-start gap-2">
              <label className="font-[500] text-[14px] leading-[16.8px]">
                ელ-ფოსტა *
              </label>
              <input
                type="email"
                className="w-full rounded-[6px] border-[1px] border-[#808a93] p-[10px]"
              />
              <div className="flex items-center gap-2 text-[14px] leading-[16.8px] font-[400] text-[#021526]">
                <img src="/icons/check.png" alt="check" />
                <span>მინიმუმ 2 სიმბოლო</span>
              </div>
            </div>

            {/* Phone Number Input */}
            <div className="w-full flex flex-col justify-center items-start gap-2">
              <label className="font-[500] text-[14px] leading-[16.8px]">
                ტელეფონის ნომერი
              </label>
              <input
                type="number"
                className="w-full rounded-[6px] border-[1px] border-[#808a93] p-[10px]"
              />
              <div className="flex items-center gap-2 text-[14px] leading-[16.8px] font-[400] text-[#021526]">
                <img src="/icons/check.png" alt="check" />
                <span>მხოლოდ რიცხვები</span>
              </div>
            </div>
          </div>

          <div className="w-full relative m-auto rounded-[8px] border-[1px] border-[#2D3648] border-dashed h-[120px] flex justify-center items-center">
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
            <button
              type="button"
              onClick={handleButtonClick}
              className="file-input-icon w-[20px] h-[20px] rounded-full border-[1px] border-[#2D3648] flex justify-center items-center cursor-pointer"
            >
              +
            </button>
          </div>

          {selectedImage && (
            <div className="w-full relative m-auto rounded-[8px] border-[1px] border-[#2D3648] border-dashed h-[120px] p-4 flex justify-start items-center gap-4">
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Selected"
                className="w-[92px] relative h-[82px] object-cover rounded-[4px] m-auto"
              />
              <img src="/icons/trash.png" className="" />
            </div>
          )}

          <div className="w-full flex justify-end items-center gap-[15px]">
            <button
              type="button"
              className="rounded-[10px] border-[1px] border-[#F93B1D] text-[#F93B1D] hover:bg-[#F93B1D] hover:text-[#FFFFFF] text-[16px] leading-[19.2px] font-[500] text-center py-[10px] px-[16px] duration-200 transition-all ease-in-out"
              onClick={() => setIsAgentModalOpen(false)}
            >
              გაუქმება
            </button>
            <button
              className="rounded-[10px] border-[1px] bg-[#F93B1D] text-[#FFFFFF] border-[#F93B1D] hover:bg-[#DF3014] text-[16px] leading-[19.2px] font-[500] text-center py-[10px] px-[16px] duration-200 transition-all ease-in-out"
              type="submit"
            >
              დაამატე აგენტი
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAgentModal;
