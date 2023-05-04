import { unwrapResult } from '@reduxjs/toolkit';
import { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '~/redux_store/user/userAction';
import { toastMessage } from '~/utils/toast';

import RegisterForm from './RegisterForm';

export const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      console.log('Form submit: ', values);
      const action = registerUser(values);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);
      console.log('New user', user);
      toastMessage.success(user.message);
      if(user.message == 'Đăng ký tài khoản thành công'){

        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      toastMessage.error('Đăng ký không thành công');
      console.log('Failed to register: ', error);
    }
  };
  return (
    <>
      <RegisterForm onSubmit={handleSubmit} />
      <Toaster />
    </>
  );
};
