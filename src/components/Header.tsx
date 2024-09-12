const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full h-[100px] border-b-[1px] bg-[#FFFFFF] border-[#DBDBDB] flex items-center z-10">
      <div className="px-[162px] py-[38px]">
        <img src={"/logo/logo.png"} alt="Logo" className="w-[150px] h-[24px]" />
      </div>
    </header>
  );
};

export default Header;
