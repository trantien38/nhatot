import React, { useState, useEffect } from 'react';
import MessageItem from './MessageItem';

function MessageList(props) {
  const [loadMore, setLoadMore] = useState(true);

  const avatar =
    'https://static.chotot.com/storage/chat/member-profile-avatar_140x140.png';

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
        if (
          window.scrollY + window.innerHeight ===
          list.clientHeight + list.offsetTop
        ) {
          setLoadMore(true);
        }
      });
    }
  }, []);

  useEffect(() => {
    const list = document.getElementById('list');

    if (list.clientHeight <= window.innerHeight && list.clientHeight) {
      setLoadMore(true);
    }
  }, [props.state]);
  return (
    <div id="list">
      <MessageItem
        active={false}
        img={avatar}
        name={'Trần Tiến'}
        messageTime={'1 giờ trước'}
        title={
          'Cho thuê phòng trọ'
        }
        content={
          'Phòng này còn cho thuê không ạ?'
        }
      />
      <MessageItem
        img={avatar}
        name={'Trần Tiến'}
        messageTime={'1 giờ trước'}
        title={'Cho thuê phòng trọ'}
        content={'Phòng này còn cho thuê không ạ?'}
      />
      <MessageItem
        img={avatar}
        name={'Trần Tiến'}
        messageTime={'1 giờ trước'}
        title={'Cho thuê phòng trọ'}
        content={'Phòng này còn cho thuê không ạ?'}
      />
      <MessageItem
        img={avatar}
        name={'Trần Tiến'}
        messageTime={'1 giờ trước'}
        title={'Cho thuê phòng trọ'}
        content={'Phòng này còn cho thuê không ạ?'}
      />
      <MessageItem
        img={avatar}
        name={'Trần Tiến'}
        messageTime={'1 giờ trước'}
        title={'Cho thuê phòng trọ'}
        content={'Phòng này còn cho thuê không ạ?'}
      />
      <MessageItem
        img={avatar}
        name={'Trần Tiến'}
        messageTime={'1 giờ trước'}
        title={'Cho thuê phòng trọ'}
        content={'Phòng này còn cho thuê không ạ?'}
      />
      <MessageItem
        img={avatar}
        name={'Trần Tiến'}
        messageTime={'1 giờ trước'}
        title={'Cho thuê phòng trọ'}
        content={'Phòng này còn cho thuê không ạ?'}
      />
      <MessageItem
        img={avatar}
        name={'Trần Tiến'}
        messageTime={'1 giờ trước'}
        title={'Cho thuê phòng trọ'}
        content={'Phòng này còn cho thuê không ạ?'}
      />
      <MessageItem
        img={avatar}
        name={'Trần Tiến'}
        messageTime={'1 giờ trước'}
        title={'Cho thuê phòng trọ'}
        content={'Phòng này còn cho thuê không ạ?'}
      />
      <MessageItem
        img={avatar}
        name={'Trần Tiến'}
        messageTime={'1 giờ trước'}
        title={'Cho thuê phòng trọ'}
        content={'Phòng này còn cho thuê không ạ?'}
      />
      <MessageItem
        img={avatar}
        name={'Trần Tiến'}
        messageTime={'1 giờ trước'}
        title={'Cho thuê phòng trọ'}
        content={'Phòng này còn cho thuê không ạ?'}
      />
      <MessageItem
        img={avatar}
        name={'Trần Tiến'}
        messageTime={'1 giờ trước'}
        title={'Cho thuê phòng trọ'}
        content={'Phòng này còn cho thuê không ạ?'}
      />
      <MessageItem
        img={avatar}
        name={'Trần Tiến'}
        messageTime={'1 giờ trước'}
        title={'Cho thuê phòng trọ'}
        content={'Phòng này còn cho thuê không ạ?'}
      />
      <MessageItem
        img={avatar}
        name={'Trần Tiến'}
        messageTime={'1 giờ trước'}
        title={'Cho thuê phòng trọ'}
        content={'Phòng này còn cho thuê không ạ?'}
      />
      <MessageItem
        img={avatar}
        name={'Trần Tiến'}
        messageTime={'1 giờ trước'}
        title={'Cho thuê phòng trọ'}
        content={'Phòng này còn cho thuê không ạ?'}
      />
      <MessageItem
        img={avatar}
        name={'Trần Tiến'}
        messageTime={'1 giờ trước'}
        title={'Cho thuê phòng trọ'}
        content={'Phòng này còn cho thuê không ạ?'}
      />
      <MessageItem
        img={avatar}
        name={'Trần Tiến'}
        messageTime={'1 giờ trước'}
        title={'Cho thuê phòng trọ'}
        content={'Phòng này còn cho thuê không ạ?'}
      />
      <MessageItem
        img={avatar}
        name={'Trần Tiến'}
        messageTime={'1 giờ trước'}
        title={'Cho thuê phòng trọ'}
        content={'Phòng này còn cho thuê không ạ?'}
      />
    </div>
  );
}

export default MessageList;
