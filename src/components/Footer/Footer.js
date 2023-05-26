import { Grid, List, ListItem } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import images from '~/assets/images';
import { APP_HUAWEI, APP_STORE, GOOGLE_PLAY, QR_IMAGE, QR_SOURCE } from '~/constants';
import styles from './Footer.module.scss';
export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: '#fff',
      }}
    >
      <div className={styles.footer}>
        <Grid container sx={{ padding: '8px' }} spacing={2}>
          <Grid item md={3} sm={6} xs={6} display={{ sm: '', xs: '' }}>
            <p>HỖ TRỢ KHÁCH HÀNG</p>
            <List>
              <ListItem>
                <Link to="/">Trung tâm hỗ trợ</Link>
              </ListItem>
              <ListItem>
                <Link to="/">An toàn mua bán</Link>
              </ListItem>
              <ListItem>
                <Link to="/">Quy định cần biết</Link>
              </ListItem>
              <ListItem>
                <Link to="/">Liên hệ hỗ trợ</Link>
              </ListItem>
            </List>
          </Grid>
          <Grid item md={2.5} sm={6} xs={6} display={{ sm: '', xs: '' }}>
            <p>VỀ NHÀ TỐT</p>
            <List>
              <ListItem>
                <Link to="/">Giới thiệu</Link>
              </ListItem>
              <ListItem>
                <Link to="/">Tuyển dụng</Link>
              </ListItem>
              <ListItem>
                <Link to="/">Truyền thông</Link>
              </ListItem>
              <ListItem>
                <Link to="/">Blog</Link>
              </ListItem>
            </List>
          </Grid>
          <Grid item md={3.5} sm={6} xs={7} display={{ sm: '', xs: '' }}>
            <p style={{ padding: 0 }}>TẢI ỨNG DỤNG NHÀ TỐT</p>
            <Box sx={{ paddingTop: '8px', display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ marginRight: '8px' }}>
                <source type="image/webp" srcSet={QR_SOURCE}></source>
                <img alt="Chợ Tốt" src={QR_IMAGE} width="100" height="100" />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <img alt="App Store" src={APP_STORE} className={styles.footer_img} />
                <img alt="Google Play" src={GOOGLE_PLAY} className={styles.footer_img} />
                <img alt="App Huawei" src={APP_HUAWEI} className={styles.footer_img} />
              </Box>
            </Box>
          </Grid>
          <Grid item md={3} sm={6} xs={5} display={{ sm: '', xs: '' }}>
            <p style={{ paddingLeft: '8px' }}>LIÊN KẾT</p>
            <Grid container spacing={3} sx={{ paddingTop: '8px' }}>
              <Grid item md={2.4} sm={2.5} xs={2.5}>
                <Link to="/">
                  <img src={images.facebook} alt="Facebook" width={28} />
                </Link>
              </Grid>

              <Grid item md={2.4} sm={2.5} xs={2.5}>
                <Link to="/">
                  <img src={images.youtube} alt="YouTube" width={28} />
                </Link>
              </Grid>

              <Grid item md={2.4} sm={2.5} xs={2.5}>
                <Link to="/">
                  <img src={images.linkedin} alt="LinkedIn" width={28} />
                </Link>
              </Grid>
              <Grid item md={2.4} sm={2.5} xs={2.5}>
                <Link to="/">
                  <img src={images.instagram} alt="Instagram" width={28} />
                </Link>
              </Grid>

              <Grid item md={2.4} sm={2.5} xs={2.5}>
                <Link to="/">
                  <img src={images.telegram} alt="Telegram" width={28} />
                </Link>
              </Grid>
            </Grid>
          </Grid>
          <hr className={styles.hr} />
          <span className={styles.span}>
            CÔNG TY TNHH NHÀ TỐT - Người đại diện theo pháp luật: Trần Y Tiến; GPDKKD: 0312120782 do sở KH & ĐT TP.Đà Nẵng cấp
            ngày 11/01/2023;
            <br />
            Địa chỉ: 96 Bùi Giáng, Hòa An, Cẩm Lệ, Đà Nẵng, Việt Nam; Email: trantien01ht@gmail.com - Tổng đài CSKH: 19001007
            (100đ/phút)
          </span>
        </Grid>
      </div>
    </Box>
  );
}
