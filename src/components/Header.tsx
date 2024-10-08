import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="fixed w-full h-[100px] border-b-[1px] bg-[#FFFFFF] border-[#DBDBDB] flex items-center justify-start z-50">
      <div className="px-[162px] w-full flex justify-start m-auto items-center ">
        <img
          onClick={() => navigate("/")}
          src={"/logo/logo.png"}
          alt="Logo"
          className="w-[150px] h-[24px] cursor-pointer"
        />
      </div>
    </header>
  );
};

export default Header;
