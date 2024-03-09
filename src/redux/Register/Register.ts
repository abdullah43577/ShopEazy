import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  showPassword: boolean;
}

const initialState: InitialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  showPassword: false,
};

type FormDataProps = {
  key: "firstName" | "lastName" | "email" | "password";
  value: string;
};

export const RegisterSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<FormDataProps>) => {
      const { key, value } = action.payload;
      state[key] = value;
    },

    toggleShowPassword: (state) => {
      state.showPassword = !state.showPassword;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setFormData, toggleShowPassword } = RegisterSlice.actions;

export default RegisterSlice.reducer;
