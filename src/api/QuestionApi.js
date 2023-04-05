import { Update } from '@mui/icons-material';
import axiosClient from './axiosClient';

const questionApi = {
  getAll(params) {
    const url = '/questions';
    return axiosClient.get(url, { params });
  },
  get(id){
    const url = `/question/${id}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = '/question';
    return axiosClient.post(url, data);
  },
  update(data) {
    const url = `/question/${data.id}`;
    return axiosClient.patch(url, data);
  },
  remove(id) {
    const url = `/question/${id}`;
    return axiosClient.delete(url);
  },
};

export default questionApi;
