import axios from "axios";

const API_URL = "http://localhost:8080/api/khachhang";

export const getAllApi = () => axios.get(`${API_URL}`);
export const getPostApi = (newKhachHang) => axios.post(`${API_URL}`, newKhachHang);
export const getPutApi = (id, updateKhachHang) => axios.put(`${API_URL}/${id}`, updateKhachHang);
export const getDeleteApi = (id) => axios.delete(`${API_URL}/${id}`);
export const getKhachHangById = (id) => axios.get(`${API_URL}/${id}`)