import axiosClient from './axiosClient';

const notifiApi = {
  getAllNotifiByIdUser: (idUser) => {
    const url = `/getAllNotifiByIdUser/${idUser}`;
    return axiosClient.get(url);
  },
  deleteNotifi: (data) => {
    console.log(data);
    const url = `/deleteNotifi/${data.IdNotifi}`;
    return axiosClient.post(url, data);
  },


};

export default notifiApi;
