import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import motelApi from '~/api/MotelApi';
import { STATIC_HOST } from '~/constants';
import MessageItem from './MessageItem';

function InfoMotel({ callBackGetIdHost }) {
  const { IdRoom } = useParams();
  const [infoMotel, setInfoMotel] = useState([]);
  const imgRoom =
    'https://cdn.chotot.com/5bmc0aGA85_stXnY33AWkQrDhQlp_iGRyDa1WW-NIpQ/preset:listing/plain/40489371e66627a7da396aa506eb3640-2812770810323125887.jpg';

  useEffect(() => {
    const fetchInfoMotel = async () => {
      const InfoMotels = await motelApi.getInfoMotelByIdRoom(IdRoom);
      console.log(IdRoom);
      console.log(InfoMotels.motel);
      setInfoMotel(InfoMotels?.motel);
      callBackGetIdHost(InfoMotels?.motel[0]?.IdUser);
    };
    if (IdRoom) {
      fetchInfoMotel();
    }
  }, [IdRoom]);

  if (IdRoom)
    return (
      <MessageItem
        link={`/detail/${infoMotel[0]?.IdMotel}`}
        img={`${STATIC_HOST}motels/${infoMotel[0]?.srcMedia}` || imgRoom}
        name={infoMotel[0]?.Title}
        content={`${infoMotel[0]?.Price} triệu/tháng`}
        stylePrice={'price'}
      />
    );
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img style={{ width: '70%' }} src="https://chat.chotot.com/emptyRoom.png" />
      </Box>
      <p style={{ textAlign: 'center', color: '#333', fontWeight: 700 }}>Liên hệ để biết thêm thông tin chi tiết</p>
    </Box>
  );
}

export default InfoMotel;
