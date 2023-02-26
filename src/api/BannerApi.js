import { Update } from '@mui/icons-material';
import axiosClient from './axiosClient';

const bannerApi = {
  getSrcBanner(params) {
    const url = '/banner:active';
    return axiosClient.get(url, { params });
  },
  get(id){
    const url = `/banner/${id}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = '/banner';
    return axiosClient.post(url, data);
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
