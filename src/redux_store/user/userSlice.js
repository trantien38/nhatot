import { createSlice } from '@reduxjs/toolkit';
import StorageKeys from '~/constants/storage-keys';
import {registerUser, loginUser} from './userAction';
const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
    settings: {},
  },
  reducers: {
    logout: (state) => {
      localStorage.clear();
    },
  },

  extraReducers: {
    [registerUser.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
  },
});

const { reducer } = userSlice;

export default reducer; // default export
