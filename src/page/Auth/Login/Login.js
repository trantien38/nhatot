import { unwrapResult } from '@reduxjs/toolkit';
import { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '~/redux_store/user/userAction';
import { toastMessage } from '~/utils/toast';
import LoginForm from './LoginForm';
import { useState, useEffect } from 'react';
import StorageKeys from '~/constants/storage-keys';

export const Login = () => {
  const [authenticated, setauthenticated] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const loggedInUser = localStorage.getItem(StorageKeys.USER);
    if (loggedInUser) {
      setauthenticated(loggedInUser);
    }
  }, []);
  const dispatch = useDispatch();
  const handleSubmit = async (values) => {
    try {
      console.log('Form submit: ', values);
      const action = loginUser(values);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);
      toastMessage.success('Đăng nhập tài khoản thành công');
      setTimeout(() => {
        if (user) {
          navigate('/');
        }
      }, 2000);
    } catch (error) {
      toastMessage.error('Tài khoản hoặc mật khẩu chưa chính xác');
      console.log('Failed to login: ', error);
    }
  };
  return (
    <>
      <LoginForm onSubmit={handleSubmit} />
      <Toaster />
    </>
  );
};
