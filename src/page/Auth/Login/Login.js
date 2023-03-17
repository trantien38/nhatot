import { unwrapResult } from '@reduxjs/toolkit';
import { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { loginUser } from '~/redux_store/user/userAction';
import { toastMessage } from '~/utils/toast';
import LoginForm from './LoginForm';

export default function Login() {
  const dispatch = useDispatch();
  const handleSubmit = async (values) => {
    try {
      console.log('Form submit: ', values);
      const action = loginUser(values);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);
      toastMessage.success('Đăng nhập tài khoản thành công');
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
}
