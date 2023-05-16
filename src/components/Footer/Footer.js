import { Grid, Link, List, ListItem } from '@mui/material';
import { Box } from '@mui/system';
import { APP_HUAWEI, APP_STORE, GOOGLE_PLAY, QR_IMAGE, QR_SOURCE } from '~/constants';
import styles from './Footer.module.scss';
export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        marginTop: '16px',
      }}
    >
      <div className={styles.footer}>
        <Grid container sx={{ padding: '8px' }}>
          <Grid item md={2} sm={6} xs={12} display={{ sm: '', xs: '' }}>
            <p>HỖ TRỢ KHÁCH HÀNG</p>
            <List
              sx={{
                paddingBottom: '0.6rem',
                '& .css-1p823my-MuiListItem-root': {
                  fontSize: '1rem',
                  padding: '0 1rem!important',
                  width: 'inherit!important',
                  '& a': {
                    color: 'var(--color-8e8e8e)',
                    textDecoration: 'none',
                    color: '#777777 !important',
                  },
                },
              }}
            >
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
          <Grid item md={2} sm={6} xs={12} display={{ sm: '', xs: '' }}>
            <p>VỀ NHÀ TỐT</p>
            <List
              sx={{
                paddingBottom: '2rem',
                '& .css-1p823my-MuiListItem-root': {
                  fontSize: '1rem',
                  padding: '0 1rem!important',
                  width: 'inherit!important',
                  '& a': {
                    color: 'var(--color-8e8e8e)',
                    textDecoration: 'none',
                    color: '#777777 !important',
                  },
                },
              }}
            >
              <ListItem>
                <Link top="/">Giới thiệu</Link>
              </ListItem>
              <ListItem>
                <Link top="/">Tuyển dụng</Link>
              </ListItem>
              <ListItem>
                <Link top="/">Truyền thông</Link>
              </ListItem>
              <ListItem>
                <Link top="/">Blog</Link>
              </ListItem>
            </List>
          </Grid>
          <Grid item md={4} sm={6} xs={12} display={{ sm: '', xs: '' }}>
            <p style={{ padding: 0 }}>TẢI ỨNG DỤNG NHÀ TỐT</p>
            <Box>
              <Grid container>
                <Grid item md={6} sm={5} xs={6}>
                  <source type="image/webp" srcSet={QR_SOURCE}></source>
                  <img alt="Chợ Tốt" src={QR_IMAGE} width="100" height="100" />
                </Grid>
                <Grid item md={6} sm={7} xs={6}>
                  <Grid container>
                    <Grid item sm={12} xs={12}>
                      <img alt="App Store" src={APP_STORE} className={styles.footer_img} />
                    </Grid>
                    <Grid item sm={12} xs={12}>
                      <img alt="Google Play" src={GOOGLE_PLAY} className={styles.footer_img} />
                    </Grid>
                    <Grid item sm={12} xs={12}>
                      <img alt="App Huawei" src={APP_HUAWEI} className={styles.footer_img} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item md={4} sm={6} xs={12} display={{ sm: '', xs: '' }}>
            <p style={{ paddingLeft: '8px' }}>LIÊN KẾT</p>
            <Grid container spacing={3}>
              <Grid item md={2.4} sm={2.5} xs={2.4}>
                <Link>
                  <img
                    width={28}
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/2048px-2021_Facebook_icon.svg.png"
                  />
                </Link>
              </Grid>
              <Grid item md={2.4} sm={2.5} xs={2.4}>
                <Link>
                  <img width={28} src="https://cdn-icons-png.flaticon.com/512/3670/3670147.png" />
                </Link>
              </Grid>
              <Grid item md={2.4} sm={2.5} xs={2.4}>
                <Link>
                  <img
                    width={28}
                    src="data:image/jpeg;base64,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"
                  />
                </Link>
              </Grid>
              <Grid item md={2.4} sm={2.5} xs={2.4}>
                <Link>
                  <img
                    width={28}
                    src="data:image/png;base64,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"
                  />
                </Link>
              </Grid>
              <Grid item md={2.4} sm={2.5} xs={2.4}>
                <Link>
                  <img
                    width={28}
                    src="data:image/jpeg;base64,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"
                  />
                </Link>
              </Grid>
              <Grid item md={2.4} sm={2.5} xs={2.4}>
                <Link>
                  <img
                    width={28}
                    src="data:image/png;base64,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"
                  />
                </Link>
              </Grid>
              <Grid item md={2.4} sm={2.5} xs={2.4}>
                <Link>
                  <img
                    width={28}
                    src="data:image/png;base64,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"
                  />
                </Link>
              </Grid>
            </Grid>
          </Grid>
          <hr
            style={{
              height: '1px',
              borderTop: '1px solid #E8E8E8',
              width: '100%',
              backgroundColor: 'currentColor',
              border: 0,
              color: '#e8e8e8',
              margin: '8px 0',
              opacity: 1,
            }}
          />
          <span
            style={{
              textAlign: 'center',
              color: '#777777 !important',
              width: '100%',
              padding: '8px',
            }}
          >
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
