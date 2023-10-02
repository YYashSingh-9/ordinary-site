import { Outlet } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./Store/ActionCreatorThunk";
import MainHeader from "./Components/ParentComponents/MainHeader";
import FooterDiv from "./Components/ParentComponents/FooterDiv";

const MainRootElement = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <MainHeader />
        <Outlet />
        <FooterDiv />
      </QueryClientProvider>
    </>
  );
};

export default MainRootElement;
