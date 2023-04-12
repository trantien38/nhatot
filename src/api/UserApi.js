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
  getUser(IdUser) {
    const url = `/user/${IdUser}`;
    return axiosClient.get(url);
  },

  // ADMIN
  getAllUser() {
    const url = 'users';
    return axiosClient.get(url);
  },
};

export default userApi;
