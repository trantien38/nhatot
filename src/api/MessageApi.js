import axiosClient from './axiosClient';

const messageApi = {
  getAllMessagesUserInMotel(id) {
    const url = `/chat/${id}`;
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
