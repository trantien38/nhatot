import { NavigateNext } from '@mui/icons-material';
import { Grid, Slide } from '@mui/material';
import { Box } from '@mui/system';
import { ScrollingCarousel } from '@trendyol-js/react-carousel';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import parse from 'html-react-parser';

import motelApi from '~/api/MotelApi';
import {
  AVATAR_DEFAULT,
  CART,
  CHAT_ICON,
  FURNITURE_ICON,
  GREEN_DOT,
  GREY_DOT,
  HELP_ICON,
  INDIVIDUAL_ICON,
  LOCATION_GRAY_ICON,
  PHONE_ICON,
  PRICE_ICON,
  REPORT_ICON,
  SAVEAD_ICON,
  SHARE_ICON,
  SHIELD_ICON,
  STATIC_HOST,
  TIMER_ICON,
} from '~/constants';
import StorageKeys from '~/constants/storage-keys';
import Questions from '../Message/components/Question/Questions';
import DetailItem from './components/DetailItem';
import DetailSkeleton from './components/DetailSkeleton';
import DialogMap from './components/DialogMap';
import ImageItem from './components/ImageItem';
import styles from './Detail.module.scss';
import messageApi from '~/api/MessageApi';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function Detail({ socket }) {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('09********');
  const [motel, setMotel] = useState([]);
  const [media, setMedia] = useState([]);
  const [openMap, setOpenMap] = useState(false);
  const params = useParams();
  const user = JSON.parse(localStorage?.getItem(StorageKeys.USER));
  const activeStatus = JSON.parse(localStorage.getItem(StorageKeys?.USER))?.activeStatus == 1;
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(true);
  const handleOpenMap = () => {
    setOpenMap(true);
  };
  const handleCloseMap = () => {
    setOpenMap(false);
  };
  useEffect(() => {
    const fetchMotel = async () => {
      const motelItem = await motelApi.getInfoMotel(params.IdMotel);
      console.log(motelItem);
      setMotel(motelItem.motel);
      setAddress(
        `${motelItem?.motel[0]?.Address}, ${motelItem?.motel[0]?.WardPrefix} ${motelItem?.motel[0]?.WardName}, ${motelItem?.motel[0]?.DistrictPrefix} ${motelItem?.motel[0]?.DistrictName}, Tp.${motelItem?.motel[0]?.ProvinceName}`,
      );
      setLoading(false);
    };
    fetchMotel();
  }, [params.IdMotel]);

  useEffect(() => {
    const fetchMedia = async () => {
      const medias = await motelApi.getMediaMotel(params.IdMotel);
      setMedia(medias.media);
      console.log(medias.media);
      setLoading(false);
    };
    fetchMedia();
  }, [params.IdMotel]);

  const handleChangeImage = (srcMedia, type) => () => {
    const elementImage = document.querySelector('.srcimage');
    const elementVideo = document.querySelector('.srcvideo');
    if (type == 'image') {
      elementImage.style.display = 'block';
      elementVideo.style.display = 'none';
      elementVideo.pause();
      elementImage.src = srcMedia;
    }
    if (type == 'video') {
      elementImage.style.display = 'none';
      elementVideo.style.display = 'block';
      elementVideo.src = srcMedia;
    }
  };
  if (loading) return <DetailSkeleton />;

  const settings = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
  };

  const handleCreateRoom = async () => {
    console.log({ IdMotel: params.IdMotel, IdRenter: user.IdUser, IdHost: motel[0].IdUser });
    const { room } = await messageApi.createRoom({ IdMotel: params.IdMotel, IdRenter: user.IdUser, IdHost: motel[0].IdUser });
    console.log(room);
    navigate(`/message-${user.IdUser}/${room[0].IdRoom}`);
  };
  const handleChangeMessage = async (newMessage) => {
    socket.emit('new_message', newMessage);
    socket.on('re-render message', (data) => {
      console.log('received message from server:', data);
    });
    const messageUserList = await messageApi.add(newMessage);
  };
  const handleSubmitQuestion = async (Content) => {
    const { room } = await messageApi.createRoom({ IdMotel: params.IdMotel, IdRenter: user.IdUser, IdHost: motel[0].IdUser });
    console.log(room[0].IdRoom);
    const newMessage = {
      Content,
      IdUser: user.IdUser,
      IdRoom: room[0].IdRoom,
    };
    handleChangeMessage(newMessage);
    setTimeout(() => {
      navigate(`/message-${user.IdUser}/${room[0].IdRoom}`);
    }, 1000);
  };
  return (
    <Grid container>
      <Grid item md={8} sm={12} xs={12}>
        <Box sx={{ backgroundColor: '#eee' }}>
          <Box sx={{ padding: '0 120px' }}>
            {/* {motel[0].Type == 'image' && ( */}
            <img
              className={clsx(styles.img, 'srcimage')}
              src={media[0]?.srcMedia?.includes('http') ? media[0]?.srcMedia : `${STATIC_HOST}motels/${media[0]?.srcMedia}`}
              style={media[0]?.Type == 'video' ? { display: 'none' } : {}}
            />
            {/* )}
            {motel[0].Type == 'video' && ( */}
            <video
              className={clsx(styles.img, 'srcvideo')}
              style={media[0]?.Type == 'image' ? { display: 'none' } : {}}
              width="100%"
              height="120"
              controls
              src={`${STATIC_HOST}motels/${media[0]?.srcMedia}`}
            >
              {/* <source src={`${STATIC_HOST}motels/${media[0]?.srcMedia}`} type="video/mp4" /> */}
            </video>
            {/* )} */}
          </Box>
          {media.length > 5 ? (
            <Slider {...settings}>
              {media.map((result) => (
                <ImageItem
                  sm={false}
                  xs={false}
                  md={false}
                  handleChangeImage={handleChangeImage}
                  key={result.IdMedia}
                  type={result?.Type}
                  srcMedia={result?.srcMedia?.includes('http') ? result.srcMedia : `${STATIC_HOST}motels/${result.srcMedia}`}
                />
              ))}
            </Slider>
          ) : (
            <ScrollingCarousel>
              <Grid container sx={{ display: 'flex' }}>
                {media.map((result) => (
                  <ImageItem
                    sm={3}
                    xs={4}
                    md={2.4}
                    handleChangeImage={handleChangeImage}
                    key={result.IdMedia}
                    type={result?.Type}
                    srcMedia={result?.srcMedia?.includes('http') ? result.srcMedia : `${STATIC_HOST}motels/${result.srcMedia}`}
                  />
                ))}
              </Grid>
            </ScrollingCarousel>
          )}
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
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <DetailItem icon={SHARE_ICON} title="Chia sẻ" />
              <DetailItem sx={{ '&:hover': { cursor: 'pointer' } }} icon={SAVEAD_ICON} title="Lưu tin" />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img width={'20px'} src={LOCATION_GRAY_ICON} />
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
            icon={TIMER_ICON}
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
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img width={'20px'} src={SHIELD_ICON} />
            <span>&nbsp; Tin đã được duyệt. &nbsp;</span>
            {/* <Link className={styles.map}>Tìm hiểu thêm</Link> */}
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
              <DetailItem icon={CART} title={'Cho thuê'} />
            </Grid>
            <Grid item md={5}>
              <DetailItem icon={PRICE_ICON} title={`Diện tích: ${motel[0]?.Acreage} m2`} />
            </Grid>
            <Grid item md={7}>
              <DetailItem icon={FURNITURE_ICON} title={`Tình trạng nội thất: ${motel[0]?.Status}`} />
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

          {motel[0] && parse(motel[0]?.Description)}
        </Box>
      </Grid>
      <Grid item md={4} display={{ md: 'block', xs: 'block', sm: 'none' }} sx={{ width: '100%' }}>
        <Box
          sx={{
            backgroundColor: '#fff',
            marginBottom: '8px',
            padding: '12px',
            display: '-webkit-box',
          }}
        >
          <Box
            sx={{
              width: '50px',
              height: '50px',
            }}
          >
            <img
              className={styles.avatar}
              src={motel[0]?.Avatar ? `${STATIC_HOST}/avatars/${motel[0]?.Avatar}` : AVATAR_DEFAULT}
            />
          </Box>
          <Box sx={{ paddingLeft: '8px', width: 'calc(100% - 50px)' }}>
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-between',
                '& a': {
                  padding: '2px',
                },
              }}
            >
              <b>{motel[0]?.Name}</b>
              <Link to={`/user/${motel[0]?.IdUser}`} className={styles.profile}>
                <p>
                  <p>Xem trang</p>
                  <NavigateNext />
                </p>
              </Link>
            </Box>
            <Box>
              <DetailItem icon={INDIVIDUAL_ICON} title={'Cá nhân'} />
            </Box>
            <Box>
              <DetailItem
                icon={motel[0]?.activeStatus == 1 ? GREEN_DOT : GREY_DOT}
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
              <Questions onSubmit={handleSubmitQuestion} />
            </Box>
          </Box>
          <Box>
            <Box className={styles.btnSdt} onClick={() => setPhoneNumber(motel[0]?.PhoneNumber)}>
              <DetailItem icon={PHONE_ICON} sdt={phoneNumber} title={'BẤM ĐỂ HIỆN SỐ'} />
            </Box>
            <div className={styles.btnChat} onClick={() => handleCreateRoom()}>
              <DetailItem icon={CHAT_ICON} title={'CHAT VỚI NGƯỜI BÁN'} />
            </div>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', margin: '12px' }}>
          <Box>
            <DetailItem icon={HELP_ICON} title={'Cần trợ giúp'} />
          </Box>
          <Box>
            <DetailItem icon={REPORT_ICON} title={'Báo cáo tin đăng này'} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Detail;
