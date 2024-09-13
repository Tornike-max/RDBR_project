const Header = () => {
  return (
    <header className="fixed w-full h-[100px] border-b-[1px] bg-[#FFFFFF] border-[#DBDBDB] flex items-center justify-start z-10">
      <div className="max-w-[1596px] w-full flex justify-start m-auto items-center ">
        <img
          src={"/logo/logo.png"}
          alt="Logo"
          className="w-[150px] h-[24px] "
        />
      </div>
    </header>
  );
};

export default Header;
