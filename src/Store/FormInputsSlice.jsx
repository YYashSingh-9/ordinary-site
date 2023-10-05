import { createSlice } from "@reduxjs/toolkit";

const initialStateTwo = {
  nameInput: "",
  emailInput: "",
  passwordInput: "",
  passwordConfirmInput: "",
  date_of_birth_Input: "",
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
      inputObj.field_name === "password"
        ? (state.nameInput = inputObj.input)
        : "";
      inputObj.field_name === "passwordconfirm"
        ? (state.nameInput = inputObj.input)
        : "";
      inputObj.field_name === "dob" ? (state.nameInput = inputObj.input) : "";
      inputObj.field_name === "mobile"
        ? (state.nameInput = inputObj.input)
        : "";
    },
  },
});

export const formAction = FormSlice.actions;
export default FormSlice;
