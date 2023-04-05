import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import InputField from '~/components/HookForm/InputField';

function LoginForm(props) {
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const schema = yup.object().shape({
    phoneNumber: yup
      .string()
      .required('Please enter your phone number')
      .matches(phoneRegExp, 'Phone number is not valid')
      .min(10, 'Phone number is too short')
      .max(10, 'Phone number is too long'),
    password: yup.string().required('Please enter your password').min(6, 'Password is too short'),
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
            backgroundImage: 'url(https://static.chotot.com/storage/assets/LOGIN/login_background.webp)',
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
            bottom: '20px',
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
                  <img src="https://static.chotot.com/storage/assets/LOGIN/logo.svg" />
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
                  label="phone"
                  placeholder="Nhập SĐT của bạn"
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
                  label="Password"
                  placeholder="Nhập mật khẩu của bạn"
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
              <Link style={{}}>
                <img src="https://static.chotot.com/storage/assets/LOGIN/facebook.svg" />
              </Link>
              <Link>
                <img src="https://static.chotot.com/storage/assets/LOGIN/google.svg" />
              </Link>
              <Link>
                <img src="https://static.chotot.com/storage/assets/LOGIN/apple.svg" />
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
              Ban chưa có tài khoản?<Link to={'/register'}>Đăng ký ngay</Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default LoginForm;
