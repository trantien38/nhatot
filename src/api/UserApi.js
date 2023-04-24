import axiosClient from './axiosClient';
const userApi = {
  register(data) {
    const url = './user/register';
    return axiosClient.post(url, data);
  },
  login(data) {
    const url = './user/login';
    return axiosClient.post(url, data);
  },
  changePassword(data) {
    const url = '/user/changePassword';
    return axiosClient.post(url, data);
  },
  changeAvatar(formData) {
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    const url = '/user/changeAvatar';
    return axiosClient.post(url, formData, config);
  },
  changeInfoUser(data) {
    const url = '/user/changeInfoUser';
    return axiosClient.post(url, data);
  },
  logout(data) {
    const url = './user/logout';
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

  // ADMIN
  getAllUser() {
    const url = 'users';
    return axiosClient.get(url);
  },
};

export default userApi;
