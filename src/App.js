import { useSelector } from 'react-redux';
import { useRoutes } from 'react-router-dom';
import './App.css';
import { useEffect } from 'react';
import routes from './configs/Routes/routes';
import StorageKeys from './constants/storage-keys';
import userApi from './api/UserApi';

function App() {
  // const handleBeforeUnload = (event) => {
  //   event.preventDefault();
  //   event.returnValue = '';
  //   event.stopImmediatePropagation();
  //   const phoneNumber = JSON.parse(localStorage.getItem(StorageKeys.USER))?.PhoneNumber;
  //   userApi.logout({ phoneNumber });
  //   localStorage.removeItem(StorageKeys.USER);
  //   localStorage.removeItem(StorageKeys.TOKEN);
  // };
  // // const isLogin = useSelector((state) => state.auth.current);
  // useEffect(() => {
  //   window.addEventListener('beforeunload', handleBeforeUnload);
  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //   };
  // }, []);
  return useRoutes(routes());
}

export default App;
