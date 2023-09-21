import { Outlet } from "react-router-dom";

import MainHeader from "./Components/ParentComponents/MainHeader";
import FooterDiv from "./Components/ParentComponents/FooterDiv";
const MainRootElement = () => {
  return (
    <>
      <MainHeader />
      <Outlet />

      <FooterDiv />
    </>
  );
};

export default MainRootElement;
