import { createAsyncThunk } from '@reduxjs/toolkit';
import userApi from '~/api/UserApi';
import StorageKeys from '~/constants/storage-keys';

export const registerUser = createAsyncThunk('user/register', async (payload) => {
  // call API to register
  const data = await userApi.register(payload);
  // save data to local storage
  // localStorage.setItem(StorageKeys.TOKEN, data.accessToken);
  // localStorage.setItem(StorageKeys.USER, JSON.stringify(data.users));
  // return user data
  console.log(data);
  return data;
});

export const loginUser = createAsyncThunk('user/login', async (payload) => {
  // call API to register
  console.log(payload);
  const data = await userApi.login(payload);
  // save data to local storage
  localStorage.setItem(StorageKeys.TOKEN, data.accessToken);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(data.users));
  console.log(data, payload);
  // return user data
  return data.users;
});

export const logoutUser = createAsyncThunk('user/logout', async (payload) => {
  // call API to register
  const data = await userApi.logout(payload);
  return data.users;
});
