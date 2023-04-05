import axiosClient from './axiosClient';
const userApi = {
  register(data) {
    const url = './user/register';
    console.log('userApi: ', data);
    return axiosClient.post(url, data);
  },
  login(data) {
    const url = './user/login';
    console.log(data);
    return axiosClient.post(url, data);
  },
  changePassword(data) {
    const url = '/user/changePassword';
    console.log(data);
    return axiosClient.post(url, data);
  },
  changeAvatar(data) {
    const url = '/user/changeAvatar';
    console.log(data);
    return axiosClient.post(url, data);
  },
  changeInfoUser(data) {
    const url = '/user/changeInfoUser';
    console.log(data);
    return axiosClient.post(url, data);
  },
  logout(data) {
    const url = './user/logout';
    console.log(data);
    return axiosClient.post(url, data);
  },
  getInfoUser(data) {
    const url = '/infoUser';
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
