import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  All: boolean;
  Men: boolean;
  Women: boolean;
  Electronics: boolean;
  Jewelery: boolean;
}

const initialState: InitialState = {
  All: false,
  Men: false,
  Women: false,
  Electronics: false,
  Jewelery: false,
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    updateFilter: (state, action: PayloadAction<keyof InitialState>) => {
      const { payload } = action;
      state[payload] = !state[payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateFilter } = filterSlice.actions;

export default filterSlice.reducer;
