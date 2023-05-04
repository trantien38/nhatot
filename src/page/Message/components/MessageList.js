import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { STATIC_HOST } from '~/constants';
import StorageKeys from '~/constants/storage-keys';
import styles from '../Message.module.scss';
import MessageItem from './MessageItem';

function MessageList(props) {
  const [loadMore, setLoadMore] = useState(true);
  const navigate = useNavigate();
  const avatar = 'https://static.chotot.com/storage/chat/member-profile-avatar_140x140.png';

  useEffect(() => {
    const list = document.getElementById('list');
    if (props.scrollable) {
      // list has fixed height
      list.addEventListener('scroll', (e) => {
        const el = e.target;
        if (el.scrollTop + el.clientHeight === el.scrollHeight) {
          setLoadMore(true);
        }
      });
    } else {
      // list has auto height
      window.addEventListener('scroll', () => {
        if (window.scrollY + window.innerHeight === list.clientHeight + list.offsetTop) {
          setLoadMore(true);
        }
      });
    }
  }, []);

  useEffect(() => {
    const list = document.getElementById('list');
    if (list?.clientHeight <= window.innerHeight && list?.clientHeight) {
      setLoadMore(true);
    }
  }, [props.state]);
  if (
    JSON.parse(localStorage.getItem(StorageKeys.USER))?.activeStatus === 1 &&
    JSON.parse(localStorage.getItem(StorageKeys.USER))?.IdUser == props.idUser
  ) {
    return (
      <div id="list" className={styles.messageList}>
        {props?.messages?.map((result) => (
          <Box key={result.IdMotel}>
            <MessageItem
              link={`/message-${props.idUser}/${result.IdMotel}`}
              onClick={result.IdMotel}
              idMotel={result.IdMotel}
              active={false}
              img={result.Avatar ? `${STATIC_HOST}/avatars/${result?.Avatar}` : avatar}
              name={result.Name}
              messageTime={
                result?.month
                  ? `${result?.month} tháng trước`
                  : result?.week
                  ? `${result?.week} tuần trước`
                  : result?.day
                  ? `${result?.day} ngày trước`
                  : result?.hour
                  ? `${result?.hour} giờ trước`
                  : result?.minute
                  ? `${result?.minute} phút trước`
                  : result?.second > 10
                  ? `${result?.second} giây trước`
                  : 'Vài giây trước'
              }
              title={result.Title}
              content={result.Content}
            />
          </Box>
        ))}
      </div>
    );
  } else {
    return navigate('/login');
  }
}

export default MessageList;
