import { Outlet } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./Store/ActionCreatorThunk";
import MainHeader from "./Components/ParentComponents/MainHeader";
import FooterDiv from "./Components/ParentComponents/FooterDiv";
import { CookiesProvider } from "react-cookie";
const MainRootElement = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <CookiesProvider>
          <MainHeader />
          <Outlet />
          <FooterDiv />
        </CookiesProvider>
      </QueryClientProvider>
    </>
  );
};

export default MainRootElement;
