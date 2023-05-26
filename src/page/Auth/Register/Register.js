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
  
      console.log('Form submit: ', values);
      const action = registerUser(values);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);
      console.log('New user', user);
      if(user){
        toastMessage.success(user.msg);

        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    
  };
  return (
    <>
      <RegisterForm onSubmit={handleSubmit} />
      <Toaster />
    </>
  );
};
