import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  isModalOpen: boolean;
}

const initialState: InitialState = {
  isModalOpen: false,
};

export const modalSlice = createSlice({
  name: "modalWindow",
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.isModalOpen = !state.isModalOpen;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleModal } = modalSlice.actions;

export default modalSlice.reducer;
