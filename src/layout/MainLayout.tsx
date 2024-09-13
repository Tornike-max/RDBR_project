import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const MainLayout = () => {
  return (
    <div className="max-w-[1596px] w-full m-auto bg-[#FFFFFF] min-h-screen flex justify-start items-center flex-col">
      <Header />
      <main className="mt-[100px] px-20  w-full flex justify-center items-center m-auto h-auto p-[0px_0px_300px_0px] gap-[20px]">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
