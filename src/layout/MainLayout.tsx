import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import { useEffect } from "react";
import { useRealEstateContext } from "../context/useRealEstateContext";

const MainLayout = () => {
  const { pathname } = useLocation();
  const { reset } = useRealEstateContext();

  useEffect(() => {
    if (pathname !== "/realEstate/create") {
      localStorage.removeItem("realEstateData");
      localStorage.removeItem("uploadedImage");
      reset();
    }

    return () => {
      reset();
    };
  }, [pathname]);

  return (
    <div className="max-w-[1920px] w-full m-auto bg-[#FFFFFF] min-h-screen flex justify-start items-center flex-col">
      <Header />
      <main className="mt-[100px] w-full  flex justify-center items-center m-auto h-auto p-[0px_0px_300px_0px] gap-[20px]">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
