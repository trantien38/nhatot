import { useState, useEffect } from 'react';
import userApi from '~/api/UserApi';
import { STATIC_HOST } from '~/constants';
import MessageItem from './MessageItem';

function InfoUser(props) {
  const { IdMotel, data, IdUser, callBackGetIdHost } = props;
  const [infoUser, setInfoUser] = useState([]);

  const avatar = 'https://static.chotot.com/storage/chat/member-profile-avatar_140x140.png';
  useEffect(() => {
    const fetchInfoUser = async () => {
      console.log({ IdMotel, IdUser });
      const infoUsers = await userApi.getInfoUser({ IdMotel, IdUser });
      console.log(infoUsers.user);
      setInfoUser(infoUsers.user);
      callBackGetIdHost(infoUsers.user[0].IdMotel);
    };
    fetchInfoUser();
  }, [IdMotel]);

  if (infoUser) {
    return (
      <MessageItem
        link={`/user/${IdUser}`}
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
    );
  }
}

export default InfoUser;
