import { createSlice } from "@reduxjs/toolkit";

const initialStateTwo = {
  nameInput: "",
  emailInput: "",
  mobileNumberInput: 0,
};

const FormSlice = createSlice({
  name: "SliceTwo",
  initialState: initialStateTwo,
  reducers: {
    inputFieldValHandler(state, action) {
      const inputObj = action.payload;
      inputObj.field_name === "name" ? (state.nameInput = inputObj.input) : "";
      inputObj.field_name === "email" ? (state.nameInput = inputObj.input) : "";
      inputObj.field_name === "mobile"
        ? (state.nameInput = inputObj.input)
        : "";
      console.log("rendered here ");
    },
  },
});

export const formAction = FormSlice.actions;
export default FormSlice;
