import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import HomePage from "./pages/HomePage";
import ShowRealEstate from "./pages/ShowRealEstate";

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
