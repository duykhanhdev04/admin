import axios from "axios";

const API_URL = "http://localhost:8080/api/nhan_vien";

export const getAllApi = () => axios.get(`${API_URL}`);
export const getPostApi = (newNhanVien) => axios.post(`${API_URL}`, newNhanVien);
export const getPutApi = (id, updateNhanVien) => axios.put(`${API_URL}/${id}`, updateNhanVien);
export const getDeleteApi = (id) => axios.delete(`${API_URL}/${id}`);
export const getNhanVienById = (id) => axios.get(`${API_URL}/${id}`)