import React, { useState, useEffect } from 'react';
import messageApi from '~/api/MessageApi';
import MessageItem from './MessageItem';

function MessageList(props) {
  const [message, setMessage] = useState([]);
  const [loadMore, setLoadMore] = useState(true);

  const avatar = 'https://static.chotot.com/storage/chat/member-profile-avatar_140x140.png';

  useEffect(() => {
    const fetchMessage = async () => {
      const messageUserList = await messageApi.getMessageUser(3);
      setMessage(messageUserList.message);
    };
    fetchMessage();
  }, []);

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

    if (list.clientHeight <= window.innerHeight && list.clientHeight) {
      setLoadMore(true);
    }
  }, [props.state]);
  return (
    <div id="list">
      {message.map((result) => (
        <MessageItem
          active={false}
          img={avatar}
          name={result.Name}
          messageTime={'1 giờ trước'}
          title={result.Title}
          content={result.Content}
        />
      ))}
    </div>
  );
}

export default MessageList;
