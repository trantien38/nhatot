import { createAsyncThunk } from '@reduxjs/toolkit';
import userApi from '~/api/UserApi';
import StorageKeys from '~/constants/storage-keys';
import { toastMessage } from '~/utils/toast';

export const registerUser = createAsyncThunk('user/register', async (payload) => {
  try {
    const data = await userApi.register(payload);
    // save data to local storage
    // localStorage.setItem(StorageKeys.TOKEN, data.accessToken);
    // localStorage.setItem(StorageKeys.USER, JSON.stringify(data.users));
    // return user data
    console.log(data);
    return data;
  } catch (error) {
    toastMessage.error(error.response.data.message);
    console.log(error);
  }
  // call API to register
});

export const loginUser = createAsyncThunk('user/login', async (payload, { rejectWithValue }) => {
  try {
    // call API to register
    console.log(payload);
    const { accessToken, user, msg } = await userApi.login(payload);
    // save data to local storage
    localStorage.setItem(StorageKeys.TOKEN, accessToken);
    localStorage.setItem(StorageKeys.USER, JSON.stringify(user));
    console.log({ accessToken, user });
    // return user data
    return { accessToken, user, msg };
  } catch (error) {
    toastMessage.error(error.response.data.message);
    console.log(error);
    // return rejectWithValue(error);
  }
});

export const logoutUser = createAsyncThunk('user/logout', async (payload) => {
  // call API to register
  const data = await userApi.logout(payload);
  return data.users;
});
