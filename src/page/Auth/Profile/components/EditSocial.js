import { Box, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from '../Profile.module.scss';

function EditSocial() {
  return (
    <Box sx={{ maxWidth: '960px', margin: 'auto' }}>
      <h2>Chỉnh sửa trang cá nhân</h2>
      <Grid container>
        <Grid item md={4}>
          <ul className={styles.sidebar}>
            <li>
              <Link to="/settings/profile">Thông tin cá nhân</Link>
            </li>
            <li>
              <Link to="/settings/social">Liên kết mạng xã hội</Link>
            </li>
            <li>
              <Link to="/settings/account">Cài đặt tài khoản</Link>
            </li>
          </ul>
        </Grid>
        <Grid
          sx={{
            backgroundColor: '#fff',
            marginTop: '0px',
            marginBottom: '12px',
            paddingRight: '16px',
            paddingBottom:'16px',
            '& h3': {
              margin: 0,
            },
          }}
          item
          md={8}
          container
          spacing={2}
        >
          <Grid item md={12} sm={12} xs={12}>
            <h3>Liên kết mạng xã hội</h3>
            <span>
              Những thông tin dưới đây chỉ mang tính xác thực. Người dung khác sẽ không thể thấy thông tin này
            </span>
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <p>Facebook</p>
            <Box
              sx={{
                width: '224px',
                border: '1px solid silver',
                padding: '4px',
                display: 'flex',
                cursor: 'pointer',
                '& > span': {
                  marginLeft: '8px',
                },
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10.0014 1.66797C5.39978 1.66797 1.66895 5.32786 1.66895 9.84202C1.66895 13.9213 4.71561 17.3024 8.69978 17.918V12.2054H6.58311V9.84202H8.69978V8.0411C8.69978 5.99084 9.94394 4.86025 11.8464 4.86025C12.7581 4.86025 13.7131 5.01966 13.7131 5.01966V7.02986H12.6598C11.6264 7.02986 11.3031 7.66096 11.3031 8.3076V9.84038H13.6123L13.2431 12.2037H11.3031V17.9163C15.2873 17.304 18.3339 13.9221 18.3339 9.84202C18.3339 5.32786 14.6031 1.66797 10.0014 1.66797Z"
                  fill="#2561CF"
                ></path>
              </svg>
              <span>Liên kết với Facebook</span>
            </Box>
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <p>Google</p>
            <Box
              sx={{
                width: '224px',
                border: '1px solid silver',
                padding: '4px',
                display: 'flex',
                cursor: 'pointer',
                '& > span': {
                  marginLeft: '8px',
                },
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M18.8002 10.1951C18.8002 9.47569 18.7405 8.95069 18.6112 8.40625H10.2041V11.6534H15.1389C15.0394 12.4604 14.5022 13.6757 13.3082 14.4923L13.2915 14.601L15.9496 16.6133L16.1338 16.6312C17.8251 15.1048 18.8002 12.859 18.8002 10.1951Z"
                  fill="#4285F4"
                ></path>
                <path
                  d="M10.2043 18.7499C12.6219 18.7499 14.6515 17.9721 16.134 16.6305L13.3084 14.4915C12.5523 15.0068 11.5375 15.3665 10.2043 15.3665C7.83642 15.3665 5.8267 13.8402 5.11029 11.7305L5.00528 11.7392L2.24129 13.8295L2.20514 13.9277C3.6776 16.786 6.70216 18.7499 10.2043 18.7499Z"
                  fill="#34A853"
                ></path>
                <path
                  d="M5.11025 11.7322C4.92122 11.1878 4.81182 10.6044 4.81182 10.0016C4.81182 9.39881 4.92122 8.8155 5.1003 8.27106L5.09529 8.15511L2.29666 6.03125L2.2051 6.07381C1.59823 7.25994 1.25 8.59191 1.25 10.0016C1.25 11.4113 1.59823 12.7432 2.2051 13.9294L5.11025 11.7322Z"
                  fill="#FBBC05"
                ></path>
                <path
                  d="M10.2043 4.63331C11.8857 4.63331 13.0199 5.34303 13.6666 5.93612L16.1937 3.525C14.6417 2.11528 12.6219 1.25 10.2043 1.25C6.70216 1.25 3.6776 3.21387 2.20514 6.07218L5.10034 8.26944C5.8267 6.15972 7.83642 4.63331 10.2043 4.63331Z"
                  fill="#EB4335"
                ></path>
              </svg>
              <span>Liên kết với Google</span>
            </Box>
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <p>Apple</p>
            <Box
              sx={{
                width: '224px',
                border: '1px solid silver',
                padding: '4px',
                display: 'flex',
                cursor: 'pointer',
                '& > span': {
                  marginLeft: '8px',
                },
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M13.6377 4.09766C12.0627 4.09766 11.397 4.84922 10.3002 4.84922C9.17554 4.84922 8.31773 4.10312 6.95289 4.10312C5.61695 4.10312 4.19234 4.91875 3.28765 6.3082C2.01734 8.26758 2.23297 11.9578 4.29039 15.1016C5.02632 16.227 6.00914 17.4891 7.2982 17.5027H7.32164C8.44195 17.5027 8.77476 16.7691 10.3166 16.7605H10.34C11.8587 16.7605 12.1634 17.4984 13.2791 17.4984H13.3025C14.5916 17.4848 15.6271 16.0863 16.363 14.9652C16.8927 14.159 17.0896 13.7543 17.4959 12.8422C14.5197 11.7125 14.0416 7.49336 16.9849 5.87578C16.0865 4.75078 14.824 4.09922 13.6337 4.09922L13.6377 4.09766Z"
                  fill="#222222"
                ></path>
                <path
                  d="M13.2911 0C12.3536 0.0636719 11.2599 0.660547 10.6193 1.43984C10.038 2.14609 9.5599 3.19375 9.7474 4.20977H9.8224C10.8208 4.20977 11.8427 3.60859 12.4396 2.83828C13.0146 2.10508 13.4505 1.06602 13.2911 0Z"
                  fill="#222222"
                ></path>
              </svg>
              <span>Liên kết với Apple ID</span>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default EditSocial;
