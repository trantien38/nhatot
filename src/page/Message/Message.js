import { DeleteForever } from '@mui/icons-material';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import messageApi from '~/api/MessageApi';
import Header from '~/components/Header';
import ChatBox from './components/ChatBox';
import InfoMotel from './components/InfoMotel';
import InfoUser from './components/InfoUser';
import ItemButton from './components/ItemButton';
import MessageList from './components/MessageList';
import Questions from './components/Question/Questions';
import styles from './Message.module.scss';

export default function Message() {
  const [messageList, setMessageList] = useState([]);
  const [chat, setChat] = useState([]);
  const [idHost, setIdHost] = useState();
  const [state, setState] = useState([]);
  const { messageUserSlug } = useParams();
  const [mu, idUser] = messageUserSlug.split('-');
  const params = useParams();


  // fetch data message list
  useEffect(() => {
    const fetchMessage = async () => {
      const messageUserList = await messageApi.getListMessageUser(idUser);
      setMessageList(messageUserList.message);
      console.log(messageUserList.message);
    };
    fetchMessage();
  }, [idUser]);

  // fetch data chat box
  useEffect(() => {
    const fetchChat = async () => {
      const chatList = await messageApi.getAllMessagesUserInMotel(
        params.IdMotel,
      );
      setChat(chatList.chat);
    };
    fetchChat();
  }, [params.IdMotel]);

  // change icon
  const handleChangeIcon = () => {
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);
    const iconElements = $$('.threeIcon');
    if ($('.addIcon').alt == 'open') {
      $('.addIcon').alt = 'close';
      $('.addIcon').style = 'transform: rotate(45deg)';
      for (var i = 0; i < iconElements.length; i++) {
        iconElements[i].style = 'display: block';
      }
    } else {
      $('.addIcon').alt = 'open';
      $('.addIcon').style = 'transform: rotate(0deg)';
      for (var i = 0; i < iconElements.length; i++) {
        iconElements[i].style = 'display: none';
      }
    }
  };

  // get idHost from infomotel
  const callBackGetIdHost = (IdHost) => {
    setIdHost(IdHost);
  };

  // submit message
  const handleSubmit = async (e) => {
    e.preventDefault();
    const Content = document.chat.messages.value;

    console.log(Content);
    const messageUserList = await messageApi.add({
      Content,
      IdUser: idUser,
      IdMotel: params.IdMotel,
    });
    document.chat.messages.value = '';
    console.log(messageUserList);
    await setChat(messageUserList.chat);
  };

  return (
    <>
      <Header />
      <Box sx={{ maxWidth: '960px', margin: 'auto' }}>
        <Grid
          container
          sx={{
            backgroundColor: '#fff',
            maxWidth: '960px',
            position: 'absolute',
            bottom: 0,
            top: '112px',
            zIndex: -1,
          }}
        >
          <Grid
            item
            md={4}
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              borderLeft: '1px solid #e8e8e8',
              color: '#000',
              borderRight: '1px solid #e8e8e8',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                padding: '12px',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <h5 style={{ fontSize: '1rem', margin: 0, paddingLeft: '2px' }}>
                Chat
              </h5>
              <Box sx={{ display: 'flex' }}>
                <ItemButton active content={'Tất cả'} />
                <ItemButton content={'Tôi mua'} />
                <ItemButton content={'Tôi bán'} />
              </Box>
            </Box>
            <Box
              sx={{
                overflowX: 'hidden',
                overflowY: 'auto',
                flex: '1 1',
              }}
            >
              <MessageList
                idUser={idUser}
                messages={messageList}
                state={state}
                setState={setState}
              />
            </Box>
            <Box
              sx={{
                borderRadius: 0,
                height: '40px',
                padding: '0 10px 6px 10px',
                borderTop: '1px solid rgba(0,0,0,.1)',
                display: 'flex',
                alignItems: 'center',
                '&:hover': {
                  backgroundColor: '#e6e6e6',
                  cursor: 'pointer',
                },
              }}
            >
              <DeleteForever />
              <p>Xóa cuộc trò chuyện</p>
            </Box>
          </Grid>
          <Grid
            item
            md={8}
            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
          >
            <Box>
              <InfoUser
                IdUser={idUser}
                IdMotel={params.IdMotel}
                data={messageList}
                callBackGetIdHost={callBackGetIdHost}
              />
              <InfoMotel
                idMotel={params.IdMotel}
                callBackGetIdHost={callBackGetIdHost}
              />
            </Box>
            {params.IdMotel && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: 'column',
                  overflowX: 'hidden',
                  overflowY: 'auto',
                  flex: '1 1',
                }}
              >
                <ChatBox
                  chat={chat}
                  IdUser={idUser}
                  state={state}
                  setState={setState}
                />

                <Box sx={{}}>
                  <Questions onSubmit={handleSubmit} />
                  <Box
                    sx={{
                      display: 'flex',
                      backgroundColor: '#fff',
                      padding: ' 0 12px 8px 0',
                    }}
                  >
                    <input type="file" style={{ display: 'none' }} />
                    <form
                      name="chat"
                      onSubmit={handleSubmit}
                      className={styles.form}
                    >
                      <img
                        className={clsx(styles.messageIcon, 'addIcon')}
                        onClick={handleChangeIcon}
                        alt="open"
                        src="https://chat.chotot.com/icons/plusCircle.svg"
                      />
                      <img
                        style={{ display: 'none' }}
                        className={clsx(styles.messageIcon, 'threeIcon')}
                        src="https://chat.chotot.com/icons/message.svg"
                      />
                      <img
                        style={{ display: 'none' }}
                        className={clsx(styles.messageIcon, 'threeIcon')}
                        src="https://chat.chotot.com/icons/gallery.svg"
                      />
                      <img
                        style={{ display: 'none' }}
                        className={clsx(styles.messageIcon, 'threeIcon')}
                        src="https://chat.chotot.com/icons/location.svg"
                      />
                      <input
                        className={styles.inputMessage}
                        placeholder="Nhập tin nhắn..."
                        rows="1"
                        name="messages"
                      />
                      <button
                        type="submit"
                        className={styles.messageSubmit}
                      ></button>
                    </form>
                  </Box>
                </Box>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
