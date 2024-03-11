import { SwalAlert } from "@/components/utils/SwalAlert";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  All: boolean;
  Men: boolean;
  Women: boolean;
  Electronics: boolean;
  Jewelery: boolean;
}

const initialState: InitialState = {
  All: true,
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

      for (const key in state) {
        if (key === payload) {
          state[key] = true;
        } else {
          state[key as keyof InitialState] = false;
        }
      }

      SwalAlert({
        icon: "success",
        title: `Filter has been updated to ${payload}`,
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateFilter } = filterSlice.actions;

export default filterSlice.reducer;
