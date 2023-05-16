import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '~/components/Button/Button';
import { AVATAR_DEFAULT, STATIC_HOST } from '~/constants';
import StorageKeys from '~/constants/storage-keys';
import styles from '../Message.module.scss';
import MessageItem from './MessageItem';

function MessageList(props) {
  const [loadMore, setLoadMore] = useState(true);
  const navigate = useNavigate();

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
        {props.messages[0] ? (
          props.messages.map((result) => (
            <Box key={result.IdMotel}>
              <MessageItem
                link={`/message-${props.idUser}/${result.IdRoom}`}
                onClick={result.IdMotel}
                idMotel={result.IdMotel}
                active={false}
                img={result.Avatar ? `${STATIC_HOST}/avatars/${result?.Avatar}` : AVATAR_DEFAULT}
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
          ))
        ) : (
          <Box
            sx={{
              padding: '0 20px',
              textAlign: 'center',
              '& h5': {
                textAlign: 'center',
                fontSize: '16px',
                color: '#222',
                margin: '20px 0 8px 0',
              },
            }}
          >
            <img src="https://chat.chotot.com/emptyState.svg" />
            <h5>Bạn chưa có cuộc trò chuyện nào!</h5>
            <p>Trải nghiệm chat để làm rõ thông tin về nhà trọ trước khi bắt đầu thực hiện thuê trọ</p>
            {/* <Link to="/"> */}
            <Button linkTo="/" orange text="Về trang chủ" sx={{ width: '100px !important' }} />
            {/* </Link> */}
          </Box>
        )}
      </div>
    );
  } else {
    return navigate('/login');
  }
}

export default MessageList;
