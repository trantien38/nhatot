import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { registerUser } from '~/redux_store/user/userAction';
import { toastMessage } from '~/utils/toast';

import RegisterForm from './RegisterForm';

export default function Register() {
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    try {
      console.log('Form submit: ', values);
      const action = registerUser(values);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);
      console.log('New user', user);
      toastMessage.success(user.message);
      // return <Redirect to="/login" />;
    } catch (error) {
      // toastMessage.error(user.message);
      console.log('Failed to register: ', error);
    }
  };
  return <RegisterForm onSubmit={handleSubmit} />;
}
