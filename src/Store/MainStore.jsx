import { configureStore } from "@reduxjs/toolkit";
import StoreSlice from "./StoreSlice";

const MainStore = configureStore({ reducer: { sliceOne: StoreSlice.reducer } });
export default MainStore;
