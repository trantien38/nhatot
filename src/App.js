import { useSelector } from 'react-redux';
import { useRoutes } from 'react-router-dom';
import './App.css';
import routes from './configs/Routes/routes';

function App() {
  // const isLogin = useSelector((state) => state.auth.current);
  
  return useRoutes(routes());
}

export default App;
