import { createSlice } from "@reduxjs/toolkit";

const initialStateTwo = {
  nameInput: "",
  emailInput: "",
  passwordInput: "",
  passwordConfirmInput: "",
  date_of_birth_Input: "",
  mobileNumberInput: "",
};

const FormSlice = createSlice({
  name: "SliceTwo",
  initialState: initialStateTwo,
  reducers: {},
});
