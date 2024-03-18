import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  name?: any;
  firstName: string;
  lastName: string;
  username: string;
  phone: string;
  address: string;
  email: string;
}

const initialState: InitialState = {
  firstName: "",
  lastName: "",
  username: "",
  phone: "",
  address: "",
  email: "",
};

export const profileFormSlice = createSlice({
  name: "profileForm",
  initialState,
  reducers: {
    updateForm: (state, action: PayloadAction<InitialState>) => {
      const { payload } = action;

      state.firstName = payload.name.split(" ")[0];
      state.lastName = payload.name.split(" ")[1];
      state.username = payload.username;
      state.phone = payload.phone;
      state.address = payload.address;
      state.email = payload.email;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateForm } = profileFormSlice.actions;

export default profileFormSlice.reducer;
