import { useRef } from "react";
import { useDeleteRealEstate } from "../../hooks/useDeleteRealEstate";
import { useNavigate } from "react-router-dom";

const DeleteConfirmation = ({
  id,
  onClose,
}: {
  id: number;
  onClose: () => void;
}) => {
  const backdropRef = useRef<HTMLDivElement>(null);
  const { deleteRealEstate, isDeleting } = useDeleteRealEstate();
  const navigate = useNavigate();

  const handleClose = () => {
    if (onClose) onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === backdropRef.current) {
      handleClose();
    }
  };

  const handleDelete = () => {
    deleteRealEstate(String(id), {
      onSuccess: () => {
        navigate("/");
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
        className="relative w-[623px] h-[222px] bg-white p-6 rounded-[20px] shadow-lg flex flex-col justify-center items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-[17px] right-[17px] w-[11.08px] h-[11.08px] font-firago font-bold text-[#2D3648] hover:text-[#F93B1D] transition-colors duration-200"
          onClick={handleClose}
        >
          X
        </button>

        <h1 className="text-[#2D3648] leading-[24px] font-firago font-normal text-[20px]">
          გსურთ წაშალოთ ლისტინგი?
        </h1>
        <div className="w-full flex justify-center items-center mt-[30px] gap-[20px]">
          <button
            onClick={handleClose}
            className="rounded-[10px] px-[16px] py-[10px] border-[1px] font-firago font-medium leading-[19.2px] text-[16px] flex items-center justify-center border-[#F93B1D] text-[#F93B1D] hover:bg-[#F93B1D] hover:text-[#FFFFFF] duration-200 transition-all ease-in-out max-w-[103px] w-full"
          >
            გაუქმება
          </button>
          <button
            onClick={handleDelete}
            className="rounded-[10px] px-[16px] py-[10px] border-[1px] font-firago font-medium leading-[19.2px] text-[16px] flex items-center justify-center bg-[#F93B1D] hover:bg-[#DF3014] duration-200 transition-all ease-in-out text-[#FFFFFF] max-w-[145px] w-full"
          >
            {isDeleting ? "დაელოდეთ" : "დადასტურება"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
