import { NavigateNext } from '@mui/icons-material';
import { Grid, Slide } from '@mui/material';
import { Box } from '@mui/system';
import { ScrollingCarousel } from '@trendyol-js/react-carousel';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import motelApi from '~/api/MotelApi';
import StorageKeys from '~/constants/storage-keys';

import Questions from '../Message/components/Question/Questions';
import DetailItem from './components/DetailItem';
import DialogMap from './components/DialogMap';
import ImageItem from './components/ImageItem';
import styles from './Detail.module.scss';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function Detail() {
  console.log(123);
  const [motel, setMotel] = useState([]);
  const [image, setImage] = useState([]);
  const [openMap, setOpenMap] = useState(false);
  const params = useParams();
  const user = JSON.parse(localStorage?.getItem(StorageKeys.USER));
  const avatar = 'https://static.chotot.com/storage/default_images/default-avatar.webp';
  const activeStatus = JSON.parse(localStorage.getItem(StorageKeys?.USER))?.activeStatus == 1;
  const [address, setAddress] = useState('');
  const handleOpenMap = () => {
    setOpenMap(true);
  };
  const handleCloseMap = () => {
    setOpenMap(false);
  };
  useEffect(() => {
    const fetchMotel = async () => {
      const motelItem = await motelApi.getInfoMotel(params.IdMotel);
      console.log(motelItem.motel);
      setMotel(motelItem.motel);
      setAddress(
        `${motelItem?.motel[0]?.Address}, ${motelItem?.motel[0]?.WardPrefix} ${motelItem?.motel[0]?.WardName}, ${motelItem?.motel[0]?.DistrictPrefix} ${motelItem?.motel[0]?.DistrictName}, Tp.${motelItem?.motel[0]?.ProvinceName}`,
      );
    };
    fetchMotel();
  }, [params.IdMotel]);

  useEffect(() => {
    const fetchImage = async () => {
      const images = await motelApi.getImageMotel(params.IdMotel);
      setImage(images.image);
      console.log(images.image);
    };
    fetchImage();
  }, [params.IdMotel]);

  const handleChangeImage = (src) => () => {
    const element = document.querySelector('.srcimage');
    element.src = src;
  };
  return (
    <Grid container>
      <Grid item md={8} sx={{ padding: '0 15px' }}>
        <Box sx={{ backgroundColor: '#eee' }}>
          <Box sx={{ padding: '0 120px' }}>
            <img className={clsx(styles.img, 'srcimage')} src={motel[0]?.srcImage} />
          </Box>
          <Grid container sx={{ display: 'flex' }}>
            <ScrollingCarousel>
              {image.map((result) => (
                <ImageItem handleChangeImage={handleChangeImage} key={result.IdImage} srcImage={result.srcImage} />
              ))}
            </ScrollingCarousel>
          </Grid>
        </Box>

        <Box
          sx={{
            backgroundColor: '#fff',
            marginBottom: '8px',
            padding: '12px',
          }}
        >
          <h1 className={styles.title}>{motel[0]?.Title}</h1>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '6px',
            }}
          >
            <Box>
              <p className={styles.price}>
                {motel[0]?.Price} triệu/tháng -{' '}
                <span className={styles.acreage}>
                  {motel[0]?.Acreage} m<sup>2</sup>
                </span>
              </p>
            </Box>
            <Box display={'flex'}>
              <DetailItem icon="https://static.chotot.com/storage/icons/svg/share-new.svg" title="Chia sẻ" />
              <DetailItem
                sx={{ '&:hover': { cursor: 'pointer' } }}
                icon="https://static.chotot.com/storage/icons/saveAd/save-ad.svg"
                title="Lưu tin"
              />
            </Box>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <img width={'20px'} src="https://static.chotot.com/storage/icons/logos/ad-param/location.svg" />
            <Box sx={{ marginLeft: '8px' }}>
              <span>{address}</span>
              <br />
              <Link className={styles.map}>
                <p onClick={handleOpenMap}>Xem bản đồ</p>
                <DialogMap
                  sx={{
                    width: '990px !important',
                    maxWidth: '900px',
                  }}
                  open={openMap}
                  Transition={Transition}
                  handleClose={handleCloseMap}
                  address={address}
                />
                <p>
                  <NavigateNext />
                </p>
              </Link>
            </Box>
          </Box>
          <DetailItem
            icon={'https://static.chotot.com/storage/icons/svg/order_timer.svg'}
            title={
              motel[0]?.month
                ? `Đăng ${motel[0]?.month} tháng trước`
                : motel[0]?.week
                ? `Đăng ${motel[0]?.week} tuần trước`
                : motel[0]?.day
                ? `Đăng ${motel[0]?.day} ngày trước`
                : motel[0]?.hour
                ? `Đăng ${motel[0]?.hour} giờ trước`
                : motel[0]?.minute
                ? `Đăng ${motel[0]?.minute} phút trước`
                : `Đăng ${motel[0]?.second} giây trước`
            }
          />
          <Box sx={{ display: 'flex' }}>
            <img width={'20px'} src="https://static.chotot.com/storage/icons/svg/shield.svg" />
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
          <Grid container sx={{ marginTop: '12px' }}>
            <Grid item md={7}>
              <DetailItem icon={'https://static.chotot.com/storage/icons/logos/ad-param/ad_type.png'} title={'Cho thuê'} />
            </Grid>
            <Grid item md={5}>
              <DetailItem icon={'https://static.chotot.com/storage/icons/logos/ad-param/size.png'} title={'Diện tích: 25m2'} />
            </Grid>
            <Grid item md={7}>
              <DetailItem
                icon={'https://static.chotot.com/storage/icons/logos/ad-param/furnishing_rent.png'}
                title={`Tình trạng nội thất: ${motel[0]?.Status}`}
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
          {motel[0]?.Description}
        </Box>
      </Grid>
      <Grid item md={4} sx={{}}>
        <Box
          sx={{
            backgroundColor: '#fff',
            marginBottom: '8px',
            padding: '12px',
            display: 'flex',
          }}
        >
          <Box
            sx={{
              width: '50px',
              height: '50px',
            }}
          >
            <img className={styles.avatar} src={motel[0]?.Avatar || avatar} />
          </Box>
          <Box sx={{ paddingLeft: '8px', width: '100%' }}>
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-between',
              }}
            >
              <b>{motel[0]?.Name}</b>
              <Link to={''} className={styles.profile}>
                <p>
                  <p>Xem trang</p>
                  <NavigateNext />
                </p>
              </Link>
            </Box>
            <Box>
              <DetailItem icon={'https://static.chotot.com/storage/default_images/pty/private-pty-icon.svg'} title={'Cá nhân'} />
            </Box>
            <Box>
              <DetailItem
                icon={
                  motel[0]?.activeStatus == 1
                    ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Location_dot_green.svg/768px-Location_dot_green.svg.png'
                    : 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Location_dot_grey.svg/1200px-Location_dot_grey.svg.png'
                }
                title={
                  motel[0]?.activeStatus == 1
                    ? 'Đang hoạt động'
                    : motel[0]?.mOperatingTimeonth
                    ? `Hoạt động ${motel[0]?.monthOperatingTime} tháng trước`
                    : motel[0]?.weekOperatingTime
                    ? `Hoạt động ${motel[0]?.weekOperatingTime} tuần trước`
                    : motel[0]?.dayOperatingTime
                    ? `Hoạt động ${motel[0]?.dayOperatingTime} ngày trước`
                    : motel[0]?.hourOperatingTime
                    ? `Hoạt động ${motel[0]?.hourOperatingTime} giờ trước`
                    : motel[0]?.minuteOperatingTime
                    ? `Hoạt động ${motel[0]?.minuteOperatingTime} phút trước`
                    : `Hoạt động ${motel[0]?.secondOperatingTime} giây trước`
                }
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
                icon={'https://static.chotot.com/storage/chotot-icons/svg/white-phone.svg'}
                sdt={'093838****'}
                title={'BẤM ĐỂ HIỆN SỐ'}
              />
            </Box>
            <Link className={styles.btnChat} to={activeStatus ? `/message-${user?.IdUser}/${motel[0]?.IdMotel}` : '/login'}>
              <DetailItem
                icon={'https://static.chotot.com.vn/storage/chotot-icons/png/chat_green.png'}
                title={'CHAT VỚI NGƯỜI BÁN'}
              />
            </Link>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <DetailItem
              icon={'https://storage.googleapis.com/static-chotot-com/storage/chotot-icons/svg/support.svg'}
              title={'Cần trợ giúp'}
            />
          </Box>
          <Box>
            <DetailItem
              icon={'https://storage.googleapis.com/static-chotot-com/storage/chotot-icons/svg/warning_grey.svg'}
              title={'Báo cáo tin đăng này'}
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Detail;
