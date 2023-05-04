import { Box, Grid } from '@mui/material';
import { IconApple, IconFacebook, IconGoogle } from '~/components/Icon';
import theme from '~/theme';
import ItemLink from './ItemLink';
import Sidebar from './Sidebar';

export const EditSocial = () => {
  return (
    <Box sx={{ maxWidth: theme.size.browser, margin: 'auto', '& h2': { paddingLeft: '12px' } }}>
      <h2>Chỉnh sửa trang cá nhân</h2>
      <Grid container>
        <Sidebar />
        <Grid
          sx={{
            backgroundColor: '#fff',
            marginTop: '0px',
            marginBottom: '12px',
            paddingRight: '16px',
            paddingBottom: '16px',
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
            <span>Những thông tin dưới đây chỉ mang tính xác thực. Người dung khác sẽ không thể thấy thông tin này</span>
          </Grid>
          <ItemLink title="Facebook" icon={<IconFacebook />} content="Liên kết với Facebook" />
          <ItemLink title="Google" icon={<IconGoogle />} content="Liên kết với Google" />
          <ItemLink title="Apple" icon={<IconApple />} content="Liên kết với Apple ID" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditSocial;
