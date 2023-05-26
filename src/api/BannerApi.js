import axiosClient from './axiosClient';

const config = {
  headers: {
    'content-type': 'multipart/form-data',
  },
};
const bannerApi = {
  getSrcBanner() {
    const url = '/banner:active';
    return axiosClient.get(url);
  },
  getAll() {
    const url = '/banners';
    return axiosClient.get(url);
  },
  
  
  add(formData) {
    const url = '/banner';
    return axiosClient.post(url, formData, config);
  },
  update(data) {
    const url = `/banner/${data.id}`;
    return axiosClient.patch(url, data);
  },
  remove(id) {
    const url = `/banner/${id}`;
    return axiosClient.delete(url);
  },
};

export default bannerApi;
