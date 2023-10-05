import { configureStore } from "@reduxjs/toolkit";
import StoreSlice from "./StoreSlice";
import FormSlice from "./FormInputsSlice";
const MainStore = configureStore({
  reducer: { sliceOne: StoreSlice.reducer, sliceTwo: FormSlice.reducer },
});
export default MainStore;
