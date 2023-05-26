import axiosClient from './axiosClient';

const addressApi = {
  getProvince(params) {
    const url = '/province';
    return axiosClient.get(url, { params });
  },
  getDistrict(id) {
    const url = `/district/${id}`;
    return axiosClient.get(url);
  },
  getDistrictByProvinceName(data) {
    const url = `/districtByProvinceName`;
    return axiosClient.post(url, data);
  },
  getWard(id) {
    const url = `/ward/${id}`;
    return axiosClient.get(url);
  },
  getWardByDistrictName(data) {
    const url = `/wardByDistrictName`;
    return axiosClient.post(url, data);
  },
  getSrcAddress(params) {
    const url = '/adress:active';
    return axiosClient.get(url, { params });
  },
  get(id) {
    const url = `/address/${id}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = '/address';
    return axiosClient.post(url, data);
  },
  update(data) {
    const url = `/address/${data.id}`;
    return axiosClient.patch(url, data);
  },
  remove(id) {
    const url = `/address/${id}`;
    return axiosClient.delete(url);
  },
};

export default addressApi;
