import { useEffect, useState } from 'react';
import motelApi from '~/api/MotelApi';
import SkeletonMessageItem from '~/components/Skeleton/SkeletonMessageItem';
import { ROOM_DEFAULT, STATIC_HOST } from '~/constants';
import MessageItem from './MessageItem';

function InfoMotel({ callBackGetIdHost, IdRoom }) {
  const [infoMotel, setInfoMotel] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const InfoMotels = await motelApi.getInfoMotelByIdRoom(IdRoom);
      console.log(IdRoom);
      console.log(InfoMotels.motel);
      setInfoMotel(InfoMotels?.motel);
      setLoading(false);
      // callBackGetIdHost(InfoMotels?.motel[0]?.IdUser);
    })();
  }, [IdRoom]);
  
  if (loading) return <SkeletonMessageItem />;

  return (
    <MessageItem
      link={`/detail/${infoMotel[0]?.IdMotel}`}
      img={`${STATIC_HOST}motels/${infoMotel[0]?.srcMedia}` || ROOM_DEFAULT}
      name={infoMotel[0]?.Title}
      content={`${infoMotel[0]?.Price} triệu/tháng`}
      stylePrice={'price'}
    />
  );
}

export default InfoMotel;
