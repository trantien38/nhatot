import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import InputField from '~/components/HookForm/InputField';
import { APPLE_ICON, FACEBOOK_ICON, GOOGLE_ICON, LOGIN_BACKGROUND, LOGIN_LOGO } from '~/constants';

import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function LoginForm(props) {
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const schema = yup.object().shape({
    phoneNumber: yup
      .string()
      .required('Vui lòng nhập số điện thoại')
      .matches(phoneRegExp, 'Số điện thoại không hợp lệ')
      .min(10, 'Số điện thoại phải đủ 10 số')
      .max(10, 'Số điện thoại phải đủ 10 số'),
    password: yup.string().required('Vui lòng nhập mật khẩu').min(6, 'Mật khẩu tối thiểu 6 ký tự'),
  });
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      phoneNumber: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });
  const handleOnSubmit = async (values) => {
    console.log('handleOnSubmit in login form');
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  // LOGIN GOOGLE

  // const responseMessage = (response) => {
  //   console.log(response);
  // };
  // const errorMessage = (error) => {
  //   console.log(error);
  // };

  // const [user, setUser] = useState([]);
  // const [profile, setProfile] = useState([]);

  // const login = useGoogleLogin({
  //   onSuccess: (codeResponse) => setUser(codeResponse),
  //   onError: (error) => console.log('Login Failed:', error),
  // });

  // useEffect(() => {
  //   if (user) {
  //     axios
  //       .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
  //         headers: {
  //           Authorization: `Bearer ${user.access_token}`,
  //           Accept: 'application/json',
  //         },
  //       })
  //       .then((res) => {
  //         setProfile(res.data);
  //         console.log(res.data);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }, [user]);
  // // log out function to log the user out of google and set the profile array to null
  // const logOut = () => {
  //   googleLogout();
  //   setProfile(null);
  // };

  return (
    <Box
      sx={{
        backgroundColor: '#fff',
      }}
    >
      <Box
        sx={{
          margin: 'auto',
          maxWidth: '960px',
          position: 'relative',
          top: '16px',
          height: '520px',
        }}
      >
        <section
          style={{
            backgroundImage: `url(${LOGIN_BACKGROUND})`,
            position: 'absolute',
            zIndex: 1,
            top: 0,
            bottom: 0,
            width: '100%',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'bottom',
          }}
        ></section>
        <Box
          sx={{
            transform: 'translateX(-50%)',
            bottom: '12px',
            left: '50%',
            width: '340px',
            background: '#fff',
            boxShadow: '0 0 8px rgb(0 0 0 / 30%)',
            padding: '20px',
            position: 'absolute',
            zIndex: 2,
            top: 0,
          }}
        >
          <Box sx={{ margin: 'auto' }}>
            <form onSubmit={handleSubmit(handleOnSubmit)}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  '& h3': {
                    color: ' #ffba00',
                    marginBottom: '6px',
                  },
                  '& p': {
                    marginTop: '6px',
                    color: '#8c8c8c',
                  },
                }}
              >
                <Box>
                  <h3>Đăng nhập</h3>
                  <p>Chào bạn quay lại</p>
                </Box>
                <Box
                  sx={{
                    '& img': {
                      width: '88px',
                    },
                  }}
                >
                  <img src={LOGIN_LOGO} alt="Login logo" />
                </Box>
              </Box>
              <Box>
                <InputField
                  sx={{
                    fontSize: 2,
                    color: 'red',
                    '& label': {
                      fontSize: 14,
                    },
                    '& svg': {
                      fontSize: 18,
                    },
                  }}
                  label="Số điện thoại"
                  name="phoneNumber"
                  type="text"
                  errors={errors}
                  required
                  control={control}
                />
              </Box>
              <Box>
                <InputField
                  sx={{
                    fontSize: 2,
                    color: 'red',
                    '& label': {
                      fontSize: 14,
                    },
                    '& svg': {
                      fontSize: 18,
                    },
                  }}
                  label="Mật khẩu"
                  type="password"
                  name="password"
                  errors={errors}
                  required
                  control={control}
                />
              </Box>
              <Button
                sx={{
                  color: '#fff',
                  backgroundColor: '#f80',
                  borderColor: '#ffb057',
                  borderRadius: '4px',
                  width: '100%',
                  display: 'flex',
                  border: 'none',
                  justifyContent: 'center',
                  padding: '12px 16px 8px 16px',
                  marginTop: '8px',
                  fontSize: '14px',
                  lineHeight: '1',
                  fontWeight: '400',
                  '&:hover': {
                    cursor: 'pointer',
                    backgroundColor: '#ffb057',
                    opacity: 0.5,
                  },
                }}
                type="submit"
              >
                Đăng nhập
              </Button>
            </form>
          </Box>
          <Box>
            <Box
              sx={{
                textAlign: 'center',
                paddingTop: '16px',
                fontSize: '.875rem',
                '& a': {
                  color: '#2a70df',
                },
                '& a:hover': {
                  color: '#4e8bef',
                },
              }}
            >
              <Link to={'/forget-password'}>Bạn quên mật khẩu</Link>
            </Box>
            <Box>
              <p
                style={{
                  marginTop: '40px',
                  color: '#8c8c8c',
                  textAlign: 'center',
                }}
              >
                hoặc sử dụng
              </p>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                '& a': {
                  padding: 0,
                  marginBottom: '40px',
                },
                '& img': {
                  cursor: 'pointer',
                  borderRadius: '100%',
                  height: '40px',
                  width: '40px',
                  boxShadow: '0 0 8px rgb(0 0 0 / 30%)',
                  backgroundPosition: '50%',
                },
              }}
            >
              <Link>
                <img src={FACEBOOK_ICON} alt='Facebook Icon' />
              </Link>
              <Link style={{ margin: '0 26px' }}>
                <img src={GOOGLE_ICON} alt="Goodle Icon"  />
                {/* <img src={GOOGLE_ICON} onClick={()=>login()} /> */}
                {/* <GoogleLogin onSuccess={responseMessage} onError={errorMessage} /> */}
                {/* {profile ? (
                  <div>
                    <img src={profile.picture} alt="user image" />
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br />
                    <button onClick={logOut}>Log out</button>
                  </div>
                ) : (
                  <button onClick={() => login()}>Sign in with Google 🚀 </button>
                )} */}
              </Link>
              <Link>
                <img src={APPLE_ICON} alt="Apple Icon" />
              </Link>
            </Box>
            <Box
              sx={{
                fontSize: '.875rem',
                textAlign: 'center',
                '& a': {
                  margin: 0,
                  color: '#2a70df',
                },
                '& a:hover': {
                  color: '#4e8bef',
                },
              }}
            >
              {/* <p> */}
              Bạn chưa có tài khoản? &nbsp;<Link to={'/register'}>Đăng ký ngay</Link>
              {/* </p> */}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default LoginForm;
