import LayoutAdmin from '~/admin/components/LayoutAdmin';
import { AddBanner, EditBanner, ListBanner } from '~/admin/pages/banner';
import { AddQuestion, EditQuestion, ListQuestion } from '~/admin/pages/question';
import { AddUser, EditUser, ListUser } from '~/admin/pages/user';

import Layout from '~/components/Layout';
import { ForgetPassword, Login, Profile, Register } from '~/page/Auth';
import { EditAccount, EditProfile, EditSocial } from '~/page/Auth/Profile/components';
import Categories from '~/page/Categories/Categories';
import Detail from '~/page/Detail/Detail';
import Home from '~/page/Home/Home';
import Message from '~/page/Message/Message';
import News from '~/page/News/News';
import Post from '~/page/Post/Post';
import UserProfile from '~/page/UserProfile/UserProfile';

import { io } from 'socket.io-client';
import { STATIC_HOST } from '~/constants';
const socket = io(STATIC_HOST);

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
        path: '/post',
        element: <Post socket={socket}/>,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/user/:IdUser',
        element: <UserProfile socket={socket} />,
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
    element: <Message socket={socket} />,
  },
  {
    path: '/:messageUserSlug/:IdMotel',
    element: <Message socket={socket} />,
  },

  {
    path: 'admin',
    element: <LayoutAdmin />,
    children: [
      {
        path: 'user',
        element: <ListUser />,
      },
      {
        path: 'user/list',
        element: <ListUser />,
      },
      {
        path: 'user/add',
        element: <AddUser />,
      },
      {
        path: 'user/:editSlug',
        element: <EditUser />,
      },
      {
        path: 'question',
        element: <ListQuestion />,
      },
      {
        path: 'question/:editSlug',
        element: <EditQuestion />,
      },
      {
        path: 'question/add',
        element: <AddQuestion />,
      },
      {
        path: 'question/list',
        element: <ListQuestion />,
      },
      {
        path: 'banner',
        element: <ListBanner />,
      },
      {
        path: 'banner/:editSlug',
        element: <EditBanner />,
      },
      {
        path: 'banner/add',
        element: <AddBanner />,
      },
      {
        path: 'banner/list',
        element: <ListBanner />,
      },
    ],
  },
];

export default routes;
