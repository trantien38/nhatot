import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import userApi from '~/api/UserApi';
import { STATIC_HOST } from '~/constants';
import StorageKeys from '~/constants/storage-keys';
import MessageItem from './MessageItem';

function InfoUser(props) {
  const { IdMotel, data, IdUser, callBackGetIdHost } = props;
  const [infoUser, setInfoUser] = useState([]);
  // const IdUser = JSON.parse(localStorage.getItem(StorageKeys.USER))?.IdUser;

  const avatar = 'https://static.chotot.com/storage/chat/member-profile-avatar_140x140.png';
  useEffect(() => {
    const fetchInfoUser = async () => {
      const infoUsers = await userApi.getInfoUser({ IdMotel, IdUser });
      setInfoUser(infoUsers?.user);
      callBackGetIdHost(infoUsers?.user[0].IdMotel);
    };
    // if (IdMotel) {
    fetchInfoUser();
    // }
  }, [IdMotel]);

  if (infoUser) {
    return (
      <Box sx={{ position: 'relative' }}>
        <MessageItem
          link={`/user/${infoUser[0]?.IdUser}`}
          img={infoUser[0]?.Avatar ? `${STATIC_HOST}avatars/${infoUser[0]?.Avatar}` : avatar}
          name={infoUser[0]?.Name}
          content={
            infoUser[0]?.activeStatus == 1
              ? 'Đang hoạt động'
              : infoUser[0]?.monthOperatingTime
              ? `Hoạt động ${infoUser[0]?.monthOperatingTime} tháng trước`
              : infoUser[0]?.weekOperatingTime
              ? `Hoạt động ${infoUser[0]?.weekOperatingTime} tuần trước`
              : infoUser[0]?.dayOperatingTime
              ? `Hoạt động ${infoUser[0]?.dayOperatingTime} ngày trước`
              : infoUser[0]?.hourOperatingTime
              ? `Hoạt động ${infoUser[0]?.hourOperatingTime} giờ trước`
              : infoUser[0]?.minuteOperatingTime
              ? `Hoạt động ${infoUser[0]?.minuteOperatingTime} phút trước`
              : `Hoạt động ${infoUser[0]?.secondOperatingTime} giây trước`
          }
        />
        <Box
          sx={{
            '& a': {
              position: 'absolute',
              right: '20px',
              top: '26%',
              margin: 0,
              // padding: '',
            },
            '& a:hover': {
              // backgroundColor: 'red',
              opacity: 0.6,
            },
          }}
        >
          <Link to={`/message-${IdUser}`}>Đóng</Link>
        </Box>
      </Box>
    );
  }
}

export default InfoUser;
