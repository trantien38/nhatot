import { DeleteForever } from '@mui/icons-material';
import { FormControl, Grid, InputBase } from '@mui/material';
import { Box } from '@mui/system';
import clsx from 'clsx';
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import messageApi from '~/api/MessageApi';
import Header from '~/components/Header';
import { SearchIcon } from '~/components/Icon';
import { GALLERY_ICON, LOCATION_ICON, MESSAGE_ICON, PLUSCIRCLE_ICON } from '~/constants';
import theme from '~/theme';
import ChatBox from './components/ChatBox';
import InfoMotel from './components/InfoMotel';
import InfoUser from './components/InfoUser';
import MessageList from './components/MessageList';
import Questions from './components/Question/Questions';
import styles from './Message.module.scss';

export default function Message({ socket }) {
  const [messageList, setMessageList] = useState([]);
  const [chat, setChat] = useState([]);
  const [idHost, setIdHost] = useState();
  const [state, setState] = useState([]);
  const { messageUserSlug } = useParams();
  const [mu, idUser] = messageUserSlug.split('-');
  const params = useParams();
  const [nameUser, setNameUser] = useState('');
  const refListMessage = useRef([]);

  // fetch data message list
  const fetchMessage = async () => {
    const messageUserList = await messageApi.getListMessageUser(idUser);
    console.log(messageUserList.message);
    const listMessage = [];
    listMessage.push(messageUserList.message[0]);
    console.log(listMessage);
    const ids = [];
    ids.push(messageUserList?.message[0]?.IdRoom);
    messageUserList.message.map(async (item) => {
      if (ids.includes(item.IdRoom)) {
      } else {
        ids.push(item.IdRoom);
        listMessage.push(item);
      }
    });
    await console.log(listMessage);
    await setMessageList(listMessage);
  };
  useEffect(() => {
    fetchMessage();
  }, [idUser]);

  // fetch data chat box
  const fetchChat = async () => {
    const chatList = await messageApi.getAllMessagesUserInMotel(params.IdRoom);
    setChat(chatList.message);
    // console.log(chatList.message);
    setTimeout(() => {
      let chatboxElement = document.getElementById('chatbox');
      chatboxElement.style.scrollBehavior = 'smooth';
      chatboxElement.scrollTop = chatboxElement.scrollHeight;
    }, 100);
  };
  useEffect(() => {
    if (params.IdRoom) {
      fetchChat();
    }
  }, [params.IdRoom]);

  // change icon
  const handleChangeIcon = () => {
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);
    const iconElements = $$('.threeIcon');
    if ($('.addIcon').alt === 'open') {
      $('.addIcon').alt = 'close';
      $('.addIcon').style = 'transform: rotate(45deg)';
      for (var i = 0; i < iconElements.length; i++) {
        iconElements[i].style = 'display: block';
      }
    } else {
      $('.addIcon').alt = 'open';
      $('.addIcon').style = 'transform: rotate(0deg)';
      for (var j = 0; j < iconElements.length; j++) {
        iconElements[j].style = 'display: none';
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
    const newMessage = {
      Content,
      IdUser: idUser,
      IdRoom: params.IdRoom,
    };
    handleChangeMessage(newMessage);
  };
  const handleChangeMessage = async (newMessage) => {
    socket.emit('new_message', newMessage);
    socket.on('re-render message', (data) => {
      console.log('received message from server:', data);
      console.log(idUser, data.IdUser);
      if (data.IdUser != idUser) {
        fetchChat();
        fetchMessage();
      }
    });
    await messageApi.add(newMessage);
    // const messageUserList = await messageApi.add(newMessage);
    fetchChat();
    fetchMessage();
    document.chat.messages.value = '';
  };
  // submit question
  const handleSubmitQuestion = (Content) => {
    const newMessage = {
      Content,
      IdUser: idUser,
      IdRoom: params.IdRoom,
    };
    handleChangeMessage(newMessage);
  };

  const handleChangeMessageList = (e) => {
    const nameUser = e.target.value;
    console.log(nameUser);
    const listmessage = messageList.filter((item) => {
      // console.log('item.name: ', item.Name);
      // console.log('userName: ', nameUser);
      return item.Name.toUpperCase().includes(nameUser.toUpperCase());
    });
    // console.log('listmessage: ', listmessage);

    setMessageList(listmessage);
    // if (!nameUser) {
    //   setMessageList(refListMessage.current);
    // }
    // listmessage[0] ? setMessageList(listmessage) : setMessageList(refListMessage.current);

    // setNameUser(nameUser);
    // const fetchMessage = async () => {
    //   const messageUserList = await messageApi.getMessageByNameUser({ nameUser, IdUser: idUser });
    //   setMessageList(messageUserList.message);
    //   console.log(messageUserList.message);
    // };
    // fetchMessage();
  };

  const handleSearchMessage = () => {
    // const fetchMessage = async () => {
    //   const messageUserList = await messageApi.getMessageByNameUser({ nameUser, IdUser: idUser });
    //   setMessageList(messageUserList.message);
    //   console.log(messageUserList.message);
    // };
    // fetchMessage();
  };
  return (
    <>
      <Header />
      <Box sx={{ maxWidth: theme.size.browser, margin: 'auto' }}>
        <Grid
          container
          sx={{
            backgroundColor: '#fff',
            maxWidth: theme.size.browser,
            position: 'absolute',
            bottom: 0,
            top: theme.size.heightHeader,
            zIndex: -1,
            borderTop: '1px solid #e8e8e8',
          }}
        >
          <Grid
            item
            md={4}
            sm={params.IdRoom ? 0 : 12}
            xs={params.IdRoom ? 0 : 12}
            sx={{
              overflow: 'auto',
              height: '100%',
            }}
            display={{ md: 'block', sm: params.IdRoom ? 'none' : 0, xs: params.IdRoom ? 'none' : 0 }}
          >
            <Box
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
                <Box
                  sx={{
                    border: '1px solid gray',
                    borderRadius: '10px',
                    width: '100%',
                    display: 'flex',
                    '& span': {
                      fontSize: '18px',
                      lineHeight: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0 8px',
                    },
                  }}
                >
                  <span type="search" onSearch={() => handleSearchMessage()}>
                    <SearchIcon />
                  </span>
                  <InputBase onChange={handleChangeMessageList} placeholder="Nhập từ khóa..." sx={{ width: '100%' }}>
                    Tìm kiếm
                  </InputBase>
                </Box>
                {/* <h5 style={{ fontSize: '1rem', margin: 0, paddingLeft: '2px' }}>Chat</h5>
                <Box sx={{ display: 'flex' }}>
                  <ItemButton active content={'Tất cả'} />
                  <ItemButton content={'Tôi mua'} />
                  <ItemButton content={'Tôi bán'} />
                </Box> */}
              </Box>
              <Box
                sx={{
                  overflowX: 'hidden',
                  overflowY: 'auto',
                  flex: '1 1',
                }}
              >
                <MessageList idUser={idUser} messages={messageList} state={state} setState={setState} />
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
            </Box>
          </Grid>
          <Grid
            item
            md={8}
            sm={params.IdRoom ? 12 : 0}
            xs={params.IdRoom ? 12 : 0}
            display={{
              md: 'block',
              sm: params.IdRoom ? 'block' : 'none',
              xs: params.IdRoom ? 'block' : 'none',
            }}
            sx={{ height: '100%' }}
          >
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box>
                <InfoUser IdUser={idUser} IdRoom={params.IdRoom} data={messageList} callBackGetIdHost={callBackGetIdHost} />
                <InfoMotel IdRoom={params.IdRoom} callBackGetIdHost={callBackGetIdHost} />
              </Box>
              {params.IdRoom && (
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
                  <ChatBox chat={chat} IdUser={idUser} state={state} setState={setState} />

                  <Box sx={{}}>
                    <Questions onSubmit={handleSubmitQuestion} />
                    <Box
                      sx={{
                        display: 'flex',
                        backgroundColor: '#fff',
                        padding: ' 0 12px 8px 0',
                        '& input': {
                          fontSize: '12px',
                        },
                      }}
                    >
                      <input type="file" style={{ display: 'none' }} />
                      <form name="chat" onSubmit={handleSubmit} className={styles.form}>
                        <img
                          className={clsx(styles.messageIcon, 'addIcon')}
                          onClick={handleChangeIcon}
                          alt="open"
                          src={PLUSCIRCLE_ICON}
                        />
                        <img style={{ display: 'none' }} className={clsx(styles.messageIcon, 'threeIcon')} src={MESSAGE_ICON} />
                        <img style={{ display: 'none' }} className={clsx(styles.messageIcon, 'threeIcon')} src={GALLERY_ICON} />
                        <img style={{ display: 'none' }} className={clsx(styles.messageIcon, 'threeIcon')} src={LOCATION_ICON} />
                        <input
                          className={styles.inputMessage}
                          placeholder="Nhập tin nhắn..."
                          rows="1"
                          name="messages"
                          id="message"
                        />
                        <button type="submit" className={styles.messageSubmit}></button>
                      </form>
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
