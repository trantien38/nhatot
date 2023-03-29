import axiosClient from './axiosClient';

const motelApi = {
  getMotelsByIdWard(data) {
    const url = `/motelsInWard/${data.IdWard}`;
    console.log(data);

    return axiosClient.post(url, data);
  },

  getMotelsByIdDistrict(data) {
    const url = `/motelsInDistrict/${data.IdDistrict}`;
    console.log(data);

    return axiosClient.post(url, data);
  },

  getMotelsByIdProvince(data) {
    const url = `/motelsInProvince/${data.IdProvince}`;
    console.log(data);

    return axiosClient.post(url,data );
  },

  getAllMotels(data) {
    const url = '/motels';
    console.log(data);
    return axiosClient.post(url, data);
  },
  getInfoMotel(idMotel) {
    const url = `/motel/${idMotel}`;
    return axiosClient.get(url);
  },

  getImageMotel(id) {
    const url = `/image/${id}`;
    return axiosClient.get(url);
  },

  add(data) {
    const url = '/motel';
    return axiosClient.post(url, data);
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
