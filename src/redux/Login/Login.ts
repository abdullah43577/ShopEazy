import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  usernameOrEmail: string;
  password: string;
  showPassword: boolean;
}

const initialState: InitialState = {
  usernameOrEmail: "",
  password: "",
  showPassword: false,
};

type FormDataProps = {
  key: "usernameOrEmail" | "password";
  value: string;
};

export const LoginSlice = createSlice({
  name: "login",
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
export const { setFormData, toggleShowPassword } = LoginSlice.actions;

export default LoginSlice.reducer;
