import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { FormInput } from '~/components/HookForm/InputForm';
import { LOGIN_BACKGROUND } from '~/constants';

export const ForgetPassword = () => {
  const initialValues = { phone: '' };
  const schema = yup.object().shape({
    phone: yup.string().required('Please enter phone number and try again.').min(10),
  });
  const {
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
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
            <form onSubmit={handleSubmit}>
              <Box>
                <FormInput
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
                  placeholder="Nhập SĐT của bạn để lấy lại mật khẩu"
                  name="phone"
                  type="text"
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
              >
                Đồng ý
              </Button>
            </form>
          </Box>
          <Box
            sx={{
              marginTop: '8px',
              textAlign: 'center',
              '& a': {
                color: '#2a70df',
              },
              '& a:hover': {
                color: '#4e8bef',
              },
            }}
          >
            <Link to={'/login'}>Quay lại đăng nhập</Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
