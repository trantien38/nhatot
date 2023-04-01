import LayoutAdmin from '~/admin/components/LayoutAdmin';
import Layout from '~/components/Layout';
import ForgetPassword from '~/page/Auth/ForgetPassword/ForgetPassword';
import Login from '~/page/Auth/Login/Login';
import EditAccount from '~/page/Auth/Profile/components/EditAccount';
import EditProfile from '~/page/Auth/Profile/components/EditProfile';
import EditSocial from '~/page/Auth/Profile/components/EditSocial';
import Profile from '~/page/Auth/Profile/Profile';
import Register from '~/page/Auth/Register/Register';
import Categories from '~/page/Categories/Categories';
import Detail from '~/page/Detail/Detail';
import Home from '~/page/Home/Home';
import Message from '~/page/Message/Message';
import News from '~/page/News/News';

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
        path: 'detail/:IdMotel',
        element: <Detail />,
      },
      {
        path: 'cho-thue-phong-tro',
        element: <Categories />,
      },
      {
        path: 'cho-thue-phong-tro/:IdProvince',
        element: <Categories />,
      },
      {
        path: 'cho-thue-phong-tro/:IdProvince/:IdDistrict',
        element: <Categories />,
      },
      {
        path: 'cho-thue-phong-tro/:IdProvince/:IdDistrict/:IdWard',
        element: <Categories />,
      },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'forget-password', element: <ForgetPassword /> },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/settings/profile',
        element: <EditProfile />,
      },
      {
        path: '/settings/social',
        element: <EditSocial />,
      },
      {
        path: '/settings/account',
        element: <EditAccount />,
      },
    ],
  },
  {
    path: '/:messageUserSlug',
    element: (
      // <ProtectedRoute isLogin={isLogin}>
      <Message />
      // </ProtectedRoute>
    ),
  },
  {
    path: '/:messageUserSlug/:IdMotel',
    element: (
      // <ProtectedRoute isLogin={isLogin}>
      <Message />
      // </ProtectedRoute>
    ),
  },
  {
    path: '/admin',
    element: <LayoutAdmin />,
    children: [
      {
        path: 'user',
        element: <LayoutAdmin />,
        children: [
          {
            path: 'edit',
            element: <></>,
          },
          {
            path: 'add',
            element: <></>,
          },
          {
            path: 'list',
            element: <></>,
          },
        ],
      },
      {
        path: 'question',
        element: <></>,
        children: [
          {
            path: 'edit',
            element: <></>,
          },
          {
            path: 'add',
            element: <></>,
          },
          {
            path: 'list',
            element: <></>,
          },
        ],
      },
      {
        path: 'banner',
        element: <></>,
        children: [
          {
            path: 'edit',
            element: <></>,
          },
          {
            path: 'add',
            element: <></>,
          },
          {
            path: 'list',
            element: <></>,
          },
        ],
      },
      // {path:'',element:},
      // {path:'',element:},
      // {path:'',element:},
      // {path:'',element:},
      // {path:'',element:},
    ],
  },
];

export default routes;
