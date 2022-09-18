import { createSlice } from '@reduxjs/toolkit';

type State = {
  toggleForm: boolean;
  formId: string | undefined;
  deleteId: string | null;
};

const initialState: State = {
  toggleForm: false,
  formId: undefined,
  deleteId: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleChangeAction: (state: State) => {
      state.toggleForm = !state.toggleForm;
    },
    updateAction: (state, action) => {
      state.formId = action.payload;
    },
    deleteAction: (state, action) => {
      state.deleteId = action.payload;
    },
  },
});

export const { toggleChangeAction, updateAction, deleteAction } = userSlice.actions;

export default userSlice.reducer;
