import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import motelApi from '~/api/MotelApi';
import MessageItem from './MessageItem';

function InfoMotel({ avatar, imgRoom, idUser, idMotel, callBackGetIdHost }) {
  const [infoMotel, setInfoMotel] = useState([]);
  const [infoUser, setInfoUser] = useState([]);

  useEffect(() => {
    const fetchInfoMotel = async () => {
      const InfoMotels = await motelApi.getMotel(idMotel);
      console.log(idMotel);
      console.log(InfoMotels.motel);
      setInfoMotel(InfoMotels.motel);
      callBackGetIdHost(InfoMotels.motel[0].IdUser);
    };
    fetchInfoMotel();
    return;
  }, [idMotel]);

  useEffect(() => {
    const fetchInfoUser = async () => {
      const infoUsers = await motelApi.getUser();
      console.log(infoUsers.user);
      setInfoUser(infoUsers.user);
    };
    fetchInfoUser();
  }, []);
  if (idMotel)
    return (
      <Box>
        <MessageItem
          link={`/`}
          img={avatar}
          name={infoMotel[0]?.Name}
          content={'Hoạt động 2 giờ trước'}
        />
        <MessageItem
          link={`/detail/${infoMotel[0]?.IdMotel}`}
          img={imgRoom}
          name={infoMotel[0]?.Title}
          content={`${infoMotel[0]?.Price} triệu/tháng`}
          stylePrice={'price'}
        />
      </Box>
    );
  return (
    <Box>
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <img
          style={{ width: '70%' }}
          src="https://chat.chotot.com/emptyRoom.png"
        />
      </Box>
      <p style={{ textAlign: 'center', color: '#333', fontWeight: 700 }}>
        Liên hệ để biết thêm thông tin chi tiết
      </p>
    </Box>
  );
}

export default InfoMotel;
