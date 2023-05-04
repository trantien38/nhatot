import axiosClient from './axiosClient';

const notifiApi = {
  getAllNotifiByIdUser: (idUser) => {
    const url = `/getAllNotifiByIdUser/${idUser}`;
    return axiosClient.get(url);
  },
};

export default notifiApi;
