import axiosClient from './axiosClient';

const motelApi = {
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
  getInfoMotel(idMotel) {
    const url = `/motel/${idMotel}`;
    return axiosClient.get(url);
  },

  getMediaMotel(id) {
    const url = `/media/${id}`;
    return axiosClient.get(url);
  },

  add(formData) {
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    const url = '/motel';
    return axiosClient.post(url, formData, config);
  },
  update(data) {
    const url = `/motel/${data.id}`;
    return axiosClient.patch(url, data);
  },
  remove(id) {
    const url = `/motel/${id}`;
    return axiosClient.delete(url);
  },
};

export default motelApi;
