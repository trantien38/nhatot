import { Box, Skeleton } from '@mui/material';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NoMessage from '~/components/NoData/NoMessage';
import SkeletonMessageItem from '~/components/Skeleton/SkeletonMessageItem';
import { AVATAR_DEFAULT, STATIC_HOST } from '~/constants';
import StorageKeys from '~/constants/storage-keys';
import styles from '../Message.module.scss';
import MessageItem from './MessageItem';

function MessageList(props) {
  const [loadMore, setLoadMore] = useState(true);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   const list = document.getElementById('list');
  //   if (props.scrollable) {
  //     // list has fixed height
  //     list.addEventListener('scroll', (e) => {
  //       const el = e.target;
  //       if (el.scrollTop + el.clientHeight === el.scrollHeight) {
  //         setLoadMore(true);
  //       }
  //     });
  //   } else {
  //     // list has auto height
  //     window.addEventListener('scroll', () => {
  //       if (window.scrollY + window.innerHeight === list.clientHeight + list.offsetTop) {
  //         setLoadMore(true);
  //       }
  //     });
  //   }
  // }, []);

  // useEffect(() => {
  //   const list = document.getElementById('list');
  //   if (list?.clientHeight <= window.innerHeight && list?.clientHeight) {
  //     setLoadMore(true);
  //   }
  //   if (props.messages[0]) {
  //     setLoading(false);
  //   }
  // }, [props.state, props.messages]);
  // if (
  //   JSON.parse(localStorage.getItem(StorageKeys.USER))?.activeStatus === 1 &&
  //   JSON.parse(localStorage.getItem(StorageKeys.USER))?.IdUser == props.idUser
  // ) {
  setTimeout(() => {
    !isEmpty(props.messages) && setLoading(false);
  }, 1000);
  console.log('message list');
  return (
    <div id="list" className={styles.messageList}>
      {props.messages?.map((result) => {
        return loading ? (
          <SkeletonMessageItem />
        ) : isEmpty(props.messages[0]) ? (
          <NoMessage />
        ) : (
          <Box key={result?.IdRoom}>
            <MessageItem
              link={`/message-${props.idUser}/${result?.IdRoom}`}
              // onClick={result.IdMotel}
              // idMotel={result.IdMotel}
              active={false}
              img={result?.Avatar ? `${STATIC_HOST}/avatars/${result?.Avatar}` : AVATAR_DEFAULT}
              name={result?.Name}
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
              title={result?.Title}
              content={result?.Content}
              IdRoom={result?.IdRoom}
            />
          </Box>
        );
      })}
      {/* {isEmpty(props.messages) && !loading && <NoMessage />} */}
    </div>
  );
  // } else {
  //   return navigate('/login');
  // }
}

export default MessageList;
