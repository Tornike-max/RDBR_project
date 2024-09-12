import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const MainLayout = () => {
  return (
    <div className="max-w-[1920px] bg-[#FFFFFF] w-full min-h-screen flex flex-col">
      <Header />
      <main className="pt-[100px] w-full flex-1 px-[162px] py-[38px]">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
