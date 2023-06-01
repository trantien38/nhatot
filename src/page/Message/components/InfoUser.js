import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import userApi from '~/api/UserApi';
import SkeletonMessageItem from '~/components/Skeleton/SkeletonMessageItem';
import { AVATAR_DEFAULT, STATIC_HOST } from '~/constants';
import MessageItem from './MessageItem';

function InfoUser(props) {
  const { IdRoom, IdUser, callBackGetIdHost } = props;
  const [loading, setLoading] = useState(true);
  const [infoUser, setInfoUser] = useState([]);

  useEffect(() => {
    const fetchInfoUser = async () => {
      const infoUsers = await userApi.getInfoUser({ IdRoom, IdUser });
      setInfoUser(infoUsers?.user);
      // callBackGetIdHost(infoUsers?.user[0].IdMotel);
      setLoading(false);
    };

    fetchInfoUser();
  }, [IdRoom]);

  if (loading) return <SkeletonMessageItem />;

  return (
    <Box sx={{ position: 'relative' }}>
      <MessageItem
        link={`/user/${infoUser[0]?.IdUser}`}
        img={infoUser[0]?.Avatar ? `${STATIC_HOST}avatars/${infoUser[0]?.Avatar}` : AVATAR_DEFAULT}
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
            padding: '6px',
            borderRadius: '6px',
            color: 'red',
          },
          '& a:hover': {
            opacity: 0.6,
            backgroundColor: '#ececec',
          },
        }}
      >
        <Link to={`/message-${IdUser}`}>Đóng</Link>
      </Box>
    </Box>
  );
}

export default InfoUser;
