import { useState, useEffect } from 'react';
import userApi from '~/api/UserApi';
import MessageItem from './MessageItem';

function InfoUser(props) {
  const { IdMotel, data, IdUser, callBackGetIdHost } = props;
  const [infoUser, setInfoUser] = useState([]);

  const avatar =
    'https://static.chotot.com/storage/chat/member-profile-avatar_140x140.png';

  useEffect(() => {
    const fetchInfoUser = async () => {
      const infoUsers = await userApi.getInfoUser({ IdMotel, IdUser });
      console.log(infoUsers.user[0].Name);
      setInfoUser(infoUsers.user);
      callBackGetIdHost(infoUsers.user[0].IdMotel);
    };
    fetchInfoUser();
  }, [IdMotel]);
  
  if (IdMotel) {
    return (
      <MessageItem
        link={`/`}
        img={infoUser[0]?.Avatar || avatar}
        name={infoUser[0]?.Name}
        content={'Hoạt động 2 giờ trước'}
      />
    );
  }
}

export default InfoUser;
