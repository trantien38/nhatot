import axiosClient from './axiosClient';

const messageApi = {
  createRoom(data) {
    const url = '/createRoom';
    return axiosClient.post(url, data);
  },
  getMessageByNameUser(data) {
    const url = `/getMessageByNameUser`;
    return axiosClient.post(url, data);
  },
  getAllMessagesUserInMotel(idMotel) {
    const url = `/chat/${idMotel}`;
    return axiosClient.get(url);
  },

  getListMessageUser(id) {
    const url = `/messageUser/${id}`;
    return axiosClient.get(url);
  },

  getHost(id) {
    const url = `/host/${id}`;
    return axiosClient.get(url);
  },

  getRenter(id) {
    const url = `/renter/${id}`;
    return axiosClient.get(url);
  },

  getImageMotel(id) {
    const url = `/image/${id}`;
    return axiosClient.get(url);
  },

  add(data) {
    const url = '/message';
    console.log(data);
    return axiosClient.post(url, data);
  },
  update(data) {
    const url = `/message/${data.id}`;
    return axiosClient.patch(url, data);
  },
  remove(id) {
    const url = `/message/${id}`;
    return axiosClient.delete(url);
  },
};

export default messageApi;
