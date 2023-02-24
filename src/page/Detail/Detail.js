import { NavigateNext } from '@mui/icons-material';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import Questions from '../Message/Questions';
import styles from './Detail.module.scss';
import DetailItem from './DetailItem';

function Detail() {
  return (
    <Box sx={{ maxWidth: '960px', margin: 'auto' }}>
      <Grid container>
        <Grid md={8} padding={'0 15px'}>
          <Box
            sx={
              {
                // position: 'relative'
              }
            }
          >
            <Box
              sx={
                {
                  // position: 'relative', overflow: 'hidden', outline: 'none'
                }
              }
            >
              <Box
                sx={
                  {
                    // position: 'relative', width: '100%', outline: 'none'
                  }
                }
              >
                <Box
                  sx={
                    {
                      // position: 'absolute',
                      // top: 0,
                      // bottom: 0,
                      // right: 0,
                      // left: 0,
                      // textAlign: 'center',
                      // outline: 'none',
                    }
                  }
                >
                  <img
                    width={'100%'}
                    src="https://cdn.chotot.com/hCdKb1TzdVTkZA_--C2atQ3YqfRaClGjprh9YU2VzyE/preset:view/plain/8b71d2c9ebb5f69bed429097129016e8-2813703992729791240.jpg"
                  />
                </Box>
              </Box>
            </Box>
          </Box>

          <Grid container sx={{ display: 'flex' }}>
            <Grid sx={{ backgroundColor: 'red' }} xs={3} md={3}>
              <img
                width={'100%'}
                src="https://cdn.chotot.com/hCdKb1TzdVTkZA_--C2atQ3YqfRaClGjprh9YU2VzyE/preset:view/plain/8b71d2c9ebb5f69bed429097129016e8-2813703992729791240.jpg"
              />
            </Grid>
            <Grid sx={{ backgroundColor: 'red' }} xs={3} md={3}>
              <img
                width={'100%'}
                src="https://cdn.chotot.com/hCdKb1TzdVTkZA_--C2atQ3YqfRaClGjprh9YU2VzyE/preset:view/plain/8b71d2c9ebb5f69bed429097129016e8-2813703992729791240.jpg"
              />
            </Grid>
            <Grid sx={{ backgroundColor: 'red' }} xs={3} md={3}>
              <img
                width={'100%'}
                src="https://cdn.chotot.com/hCdKb1TzdVTkZA_--C2atQ3YqfRaClGjprh9YU2VzyE/preset:view/plain/8b71d2c9ebb5f69bed429097129016e8-2813703992729791240.jpg"
              />
            </Grid>
          </Grid>
          <Box
            sx={{
              backgroundColor: '#fff',
              marginBottom: '8px',
              padding: '12px',
            }}
          >
            <h1 className={styles.title}>Cho thuê nhà</h1>
            <Box display={'flex'} justifyContent={'space-between'}>
              <Box>
                <p className={styles.price}>
                  1,5 triệu/tháng -{' '}
                  <span className={styles.acreage}>
                    25 m<sup>2</sup>
                  </span>
                </p>
              </Box>
              <Box display={'flex'}>
                <Box
                  sx={{
                    display: 'flex',
                    margin: '0 21px',
                  }}
                >
                  <img
                    style={{ padding: '4px' }}
                    src="https://static.chotot.com/storage/icons/svg/share-new.svg"
                  />
                  <p>Chia sẻ</p>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    margin: '0 20px',
                  }}
                >
                  <img
                    style={{ padding: '4px' }}
                    src="https://static.chotot.com/storage/icons/saveAd/save-ad.svg"
                  />
                  <p>Lưu tin</p>
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <img
                width={'20px'}
                src="https://static.chotot.com/storage/icons/logos/ad-param/location.svg"
              />
              <Box sx={{ marginLeft: '8px' }}>
                <span>
                  Kiệt 21 Lê Quang Sung, Phường Chính Gián, Quận Thanh Khê, Đà
                  Nẵng
                </span>
                <br />
                <Link className={styles.map}>
                  <p>Xem bản đồ</p>
                  <p>
                    <NavigateNext />
                  </p>
                </Link>
              </Box>
            </Box>
            <DetailItem
              icon={
                'https://static.chotot.com/storage/icons/svg/order_timer.svg'
              }
              title={'Đăng 6 giờ trước'}
            />
            <Box sx={{ display: 'flex' }}>
              <img
                width={'20px'}
                src="https://static.chotot.com/storage/icons/svg/shield.svg"
              />
              <span>&nbsp;&nbsp;Tin đã được duyệt. &nbsp;</span>
              <Link className={styles.map}>Tìm hiểu thêm</Link>
            </Box>
          </Box>
          <Box
            sx={{
              backgroundColor: '#fff',
              marginBottom: '8px',
              padding: '12px',
            }}
          >
            <h1 className={styles.title}>Đặc điểm bất động sản</h1>
            <Grid container>
              <Grid md={6}>
                <DetailItem
                  icon={
                    'https://static.chotot.com/storage/icons/logos/ad-param/ad_type.png'
                  }
                  title={'Cho thuê'}
                />
              </Grid>
              <Grid md={6}>
                <DetailItem
                  icon={
                    'https://static.chotot.com/storage/icons/logos/ad-param/size.png'
                  }
                  title={'Diện tích: 25m2'}
                />
              </Grid>
              <Grid md={6}>
                <DetailItem
                  icon={
                    'https://static.chotot.com/storage/icons/logos/ad-param/furnishing_rent.png'
                  }
                  title={'Tình trạng nội thất: nhà trống'}
                />
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{
              backgroundColor: '#fff',
              marginBottom: '8px',
              padding: '12px',
            }}
          >
            <h1 className={styles.title}>Mô tả chi tiết</h1>
            <p className={styles.detailP} itemprop="description">
              Cho thuê nhà <br />
              Lối đi riêng <br />
              Điện nước riêng <br />
              Cho người thuê có việc làm hoặc gia đình ở, nhà nhỏ ko quá 4 người
            </p>
            <span className={styles.contact}>Nhấn để hiện số: 093838 ****</span>
          </Box>
        </Grid>
        <Grid md={4} sx={{}}>
          <Box
            sx={{
              backgroundColor: '#fff',
              marginBottom: '8px',
              padding: '12px',
              display: 'flex',
            }}
          >
            <Box className={styles.avatar} />
            <Box sx={{ paddingLeft: '8px', width: '100%' }}>
              <Box
                sx={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'space-between',
                }}
              >
                <b>Trần Tiến</b>
                <Link to={''} className={styles.profile}>
                  <p>
                    <p>Xem trang</p>
                    <NavigateNext />
                  </p>
                </Link>
              </Box>
              <Box>
                <DetailItem
                  icon={
                    'https://static.chotot.com/storage/default_images/pty/private-pty-icon.svg'
                  }
                  title={'Cá nhân'}
                />
              </Box>
              <Box>
                <DetailItem
                  icon={
                    // 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Green_dot.svg/1024px-Green_dot.svg.png'
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Location_dot_grey.svg/1200px-Location_dot_grey.svg.png'
                  }
                  title={'Chưa hoạt động'}
                />
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              backgroundColor: '#fff',
              marginBottom: '8px',
              padding: '12px',
            }}
          >
            <Box>
              <h1 className={styles.title}>Liên hệ với người bán</h1>
              <Box className={styles.question}>
                <Questions />
              </Box>
            </Box>
            <Box>
              <Box className={styles.btnSdt}>
                <DetailItem
                  icon={
                    'https://static.chotot.com/storage/chotot-icons/svg/white-phone.svg'
                  }
                  sdt={'093838****'}
                  title={'BẤM ĐỂ HIỆN SỐ'}
                />
              </Box>
              <Link className={styles.btnChat} to={`/messages`}>
                {' '}
                {/*/${IdUser}*/}
                <DetailItem
                  icon={
                    'https://static.chotot.com.vn/storage/chotot-icons/png/chat_green.png'
                  }
                  title={'CHAT VỚI NGƯỜI BÁN'}
                />
              </Link>
            </Box>
          </Box>
          <Box sx={{display:'flex',justifyContent:'space-between'}}>
            <Box>
              <DetailItem
                icon={
                  'https://storage.googleapis.com/static-chotot-com/storage/chotot-icons/svg/support.svg'
                }
                title={'Cần trợ giúp'}
              />
            </Box>
            <Box>
              <DetailItem
                icon={
                  'https://storage.googleapis.com/static-chotot-com/storage/chotot-icons/svg/warning_grey.svg'
                }
                title={'Báo cáo tin đăng này'}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
      {/* <Box></Box> */}
    </Box>
  );
}

export default Detail;
