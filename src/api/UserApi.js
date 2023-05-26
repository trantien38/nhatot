import axiosClient from './axiosClient';
const userApi = {

  addFavourite(data) {
    const url = '/user/addFavourite';
    return axiosClient.post(url, data);
  },
  deleteFavourite(data) {
    const url = '/user/deleteFavourite';
    return axiosClient.post(url, data);
  },

  register(data) {
    const url = '/auth/register';
    return axiosClient.post(url, data);
  },
  login(data) {
    const url = '/auth/login';
    return axiosClient.post(url, data);
  },
  changePassword(data) {
    const url = '/auth/changePassword';
    return axiosClient.post(url, data);
  },
  changeAvatar(formData) {
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    const url = '/auth/changeAvatar';
    return axiosClient.post(url, formData, config);
  },
  changeInfoUser(data) {
    const url = '/auth/changeInfoUser';
    return axiosClient.post(url, data);
  },
  logout(data) {
    const url = './auth/logout';
    return axiosClient.post(url, data);
  },
  getInfoUser(data) {
    const url = '/infoUser';
    return axiosClient.post(url, data);
  },
  getUser(data) {
    const url = `/user/${data.IdUser}`;
    console.log(data);
    return axiosClient.post(url, data);
  },

  follow(data) {
    const url = '/user/follow';
    console.log(data);
    return axiosClient.post(url, data);
  },

};

export default userApi;
