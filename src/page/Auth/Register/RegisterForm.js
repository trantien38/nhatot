import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import InputField from '~/components/HookForm/InputField';

function RegisterForm(props) {
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const schema = yup.object().shape({
    fullName: yup
      .string()
      .required('Please enter your name')
      .test(
        'should has at least two words',
        'Please enter at least two words',
        (value) => {
          return value.split(' ').length >= 2;
        },
      ),
    phoneNumber: yup
      .string()
      .required('Please enter your phone number')
      .matches(phoneRegExp, 'Phone number is not valid')
      .min(10, 'to short')
      .max(10, 'to long'),
    password: yup.string().required('Please enter your password').min(6),
  });
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      fullName: '',
      phoneNumber: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });
  const handleOnSubmit = async (values) => {
    console.log('handleOnSubmit in register form');
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
            backgroundImage:
              'url(https://static.chotot.com/storage/assets/LOGIN/login_background.webp)',
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
                  <h3>Đăng ký</h3>
                  <p>Tạo tài khoản ngay</p>
                </Box>
                <Box
                  sx={{
                    '& img': {
                      width: '88px',
                    },
                  }}
                >
                  <img src="https://static.chotot.com/storage/assets/LOGIN/logo_register.png" />
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
                  label="Full name"
                  placeholder="Nhập tên của bạn"
                  name="fullName"
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
                  label="phoneNumber"
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
                  label="password"
                  placeholder="Tạo mật khẩu có ít nhất 6 ký tự"
                  name="password"
                  type="password"
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
                    backgroundColor: '#ffb057',
                    opacity: 0.5,
                    cursor: 'pointer',
                  },
                }}
                type="submit"
              >
                Đăng ký
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
                  margin: 0,
                },
                '& a:hover': {
                  color: '#4e8bef',
                },
              }}
            >
              Bằng việc đăng ký, bạn đã đồng ý với
              <Link to={'/forget-password'}>Điều khoản sử dụng</Link>của chúng
              tôi
            </Box>
            <Box>
              <p
                style={{
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
                  marginBottom: '6px',
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
              Ban đã có tài khoản?<Link to={'/login'}>Đăng nhập</Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default RegisterForm;
