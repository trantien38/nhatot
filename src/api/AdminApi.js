import axiosClient from './axiosClient';
const config = {
  headers: {
    'content-type': 'multipart/form-data',
  },
};
const adminApi = {
  adminGetDataDashboard: () => {
    const url = `/adminGetDataDashboard`;
    return axiosClient.get(url);
  },
  // USER
  adminAddUser(data) {
    const url = `/adminAddUser`;
    return axiosClient.post(url, data);
  },
  adminUpdateUser(data) {
    const url = `/adminUpdateUser`;
    return axiosClient.post(url, data);
  },
  getAllUser() {
    const url = '/users';
    return axiosClient.get(url);
  },

  adminChangeStatusUser(data) {
    const url = '/adminChangeStatusUser';
    console.log('adminChangeStatusUser', data);
    return axiosClient.post(url, data);
  },

  // BANNER
  adminGetAllBanner() {
    console.log('adminGetAllBanner');
    const url = '/adminGetAllBanner';
    return axiosClient.get(url);
  },
  adminRemoveBanner(id) {
    const url = `/adminRemoveBanner/${id}`;
    return axiosClient.delete(url);
  },
  adminAddBanner(formData) {
    const url = '/adminAddBanner';
    return axiosClient.post(url, formData, config);
  },
  adminUpdateBanner(formData) {
    const url = '/adminUpdateBanner';
    return axiosClient.put(url, formData, config);
  },
  adminGetBanner(id) {
    const url = `/adminGetBanner/${id}`;
    return axiosClient.get(url);
  },
};

export default adminApi;
