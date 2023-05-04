import { Facebook, Instagram, LinkedIn, Telegram, YouTube } from '@mui/icons-material';
import { Grid, Link, List, ListItem } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import styles from './Footer.module.scss';
export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: '#fff',
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
                  <source type="image/webp" srcSet="https://static.chotot.com/storage/default/group-qr.webp"></source>
                  <img
                    alt="Chợ Tốt"
                    className="aw__ifuk1ky"
                    src="https://static.chotot.com/storage/default/group-qr.jpeg"
                    width="100"
                    height="100"
                  />
                </Grid>
                <Grid item md={6} sm={7} xs={6}>
                  <Grid container>
                    <Grid item sm={12} xs={12}>
                      <img
                        alt="App Store"
                        src="https://static.chotot.com/storage/default/ios.svg"
                        className={styles.footer_img}
                      />
                    </Grid>
                    <Grid item sm={12} xs={12}>
                      <img
                        alt="Google Play"
                        src="https://static.chotot.com/storage/default/android.svg"
                        className={styles.footer_img}
                      />
                    </Grid>
                    <Grid item sm={12} xs={12}>
                      <img
                        alt="App Huawei"
                        src="https://static.chotot.com/storage/default/huawei_app_install.png"
                        className={styles.footer_img}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item md={4} sm={6} xs={12} display={{ sm: '', xs: '' }}>
            <p style={{ paddingLeft: '8px' }}>LIÊN KẾT</p>
            <List
              sx={{
                display: 'flex',
                paddingBottom: '2rem',
                '& .css-1p823my-MuiListItem-root': {
                  fontSize: '1rem',
                  padding: '0 1rem!important',
                  width: 'inherit!important',
                  '& a': {
                    color: 'var(--color-8e8e8e)',
                    textDecoration: 'none',
                  },
                },
              }}
            >
              <ListItem sx={{ padding: 0 }}>
                <Link>
                  <Facebook sx={{ fontSize: '28px' }} />
                </Link>
              </ListItem>
              <ListItem sx={{ padding: 0 }}>
                <Link>
                  <YouTube sx={{ fontSize: '28px' }} />
                </Link>
              </ListItem>
              <ListItem sx={{ padding: 0 }}>
                <Link>
                  <LinkedIn sx={{ fontSize: '28px' }} />
                </Link>
              </ListItem>
              <ListItem sx={{ padding: 0 }}>
                <Link>
                  <Instagram sx={{ fontSize: '28px' }} />
                </Link>
              </ListItem>
              <ListItem sx={{ padding: 0 }}>
                <Link>
                  <Telegram sx={{ fontSize: '28px' }} />
                </Link>
              </ListItem>
            </List>
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
              fontSize: '0.8rem',
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
