// import {} from '';
import LayoutAdmin from '~/admin/components/LayoutAdmin';
import Layout from '~/components/Layout';
import Login from '~/page/Auth/components/Login';
import Register from '~/page/Auth/components/Register';
import Home from '~/page/Home/Home';
import Message from '~/page/Message/Message';
import News from '~/page/News/News';
import ProtectedRoute from './ProtectedRoute';

let routes = () => [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'news',
        element: <News />,
      },
      {
        path: 'messages',
        element: (
            // <ProtectedRoute isLogin={isLogin}>
                <Message />
            // </ProtectedRoute>
        ),
      },
    ],
  },
  { path: 'login', element: <Login /> },
  { path: 'register', element: <Register /> },
  {
    path: 'admin',
    element: <LayoutAdmin/>,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'edit', element: <Register /> },
    ],
  },
];

export default routes;
