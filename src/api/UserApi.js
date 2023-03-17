import axiosClient from './axiosClient';
const userApi = {
  register(data) {
    const url = './user/register';
    console.log('userApi: ', data);
    return axiosClient.post(url, data);
  },
  login(data) {
    const url = './user/login';
    console.log(data)
    return axiosClient.post(url, data);
  },
};

export default userApi;
