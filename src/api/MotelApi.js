import axiosClient from './axiosClient';
const config = {
  headers: {
    'content-type': 'multipart/form-data',
  },
};
const motelApi = {
  getMotelFavourite(IdUser) {
    const url = `/getMotelFavourite/${IdUser}`;
    return axiosClient.get(url);
  },
  getMotelsByIdHost(IdUser) {
    const url = `/getMotelsByIdHost/${IdUser}`;
    return axiosClient.get(url);
  },
  getAllMotelByIdUser(IdUser) {
    const url = `/getMotelByIdUser/${IdUser}`;
    return axiosClient.get(url);
  },
  getMotelsByIdWard(data) {
    const url = `/motelsInWard/${data.IdWard}`;
    return axiosClient.post(url, data);
  },

  getMotelsByIdDistrict(data) {
    const url = `/motelsInDistrict/${data.IdDistrict}`;
    return axiosClient.post(url, data);
  },

  getMotelsByIdProvince(data) {
    const url = `/motelsInProvince/${data.IdProvince}`;
    return axiosClient.post(url, data);
  },

  getLimitMotels(data) {
    const url = '/limitmotels';
    return axiosClient.post(url, data);
  },
  getAllMotels(data) {
    const url = '/motels';
    return axiosClient.post(url, data);
  },
  getInfoMotel(data) {
    const url = `/getInfoMotel/${data.IdMotel}`;
    return axiosClient.post(url, data);
  },
  getInfoMotelByIdRoom(IdRoom) {
    const url = `/getInfoMotelByIdRoom/${IdRoom}`;
    return axiosClient.get(url);
  },

  getMediaMotel(id) {
    const url = `/media/${id}`;
    return axiosClient.get(url);
  },

  getMotelHomePage() {
    const url = `/getMotelHomePage`;
    return axiosClient.get(url);
  },

  add(formData) {
    const url = '/motel';
    return axiosClient.post(url, formData, config);
  },
  update(formData) {
    const url = `/motel`;
    return axiosClient.put(url, formData, config);
  },
  remove(id) {
    const url = `/motel/${id}`;
    return axiosClient.delete(url);
  },
};

export default motelApi;
