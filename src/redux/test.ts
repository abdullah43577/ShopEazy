import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface InitialState {
  input: string;
}

const initialState: InitialState = {
  input: '',
};

export const inputSlice = createSlice({
  name: 'input',
  initialState,
  reducers: {
    setInput: (state, action: PayloadAction<string>) => {
      state.input = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setInput } = inputSlice.actions;

export default inputSlice.reducer;
