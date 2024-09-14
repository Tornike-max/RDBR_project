import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import HomePage from "./pages/HomePage";
import ShowRealEstate from "./pages/ShowRealEstate";
import CreateRealEstate from "./pages/CreateRealEstate";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/realEstate/:realEstateId"
            element={<ShowRealEstate />}
          />
          <Route path="/realEstate/create" element={<CreateRealEstate />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
