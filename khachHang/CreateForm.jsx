import { useState } from "react";
import { VscSave } from "react-icons/vsc";
import "./KhachHang.css";
import "./CreateForm.css";
import { toast } from "react-toastify";
import { getPostApi } from "../../KhachHangApi";
import Header from "../common/Header";

function CreateForm({ handleClose, getAllKhachHang }) {
  const [formData, setFormData] = useState({
    ten_khach_hang: "",
    email: "",
    so_dien_thoai: "",
    ngay_sinh: "",
    gioi_tinh: true,
    trang_thai: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleGenderChange = (gender) => {
    setFormData((prevState) => ({
      ...prevState,
      gioi_tinh: gender,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    getPostApi(formData)
      .then((response) => {
        toast.success("Nhân viên mới đã được tạo!");
        const newKhachHang = response.data;
        getAllKhachHang((prevKhachHang) => [newKhachHang, ...prevKhachHang]);
        handleClose();
      })
      .catch((error) => {
        toast.error("Có lỗi khi tạo khách hàng:", error);
      });
  };

  return (
    <div className="flex-1 bg-white text-black overflow-auto relative w-screen">
      <Header title="Khách hàng" />
      <div className="KhachHang p-3">
        <div className="container mt-3">
          <h4 className="title">Khách hàng</h4>
          <form onSubmit={handleSubmit} className="form">
            <div className="mb-3">
              <label className="form-label">Tên khách hàng</label>
              <input
                type="text"
                className="form-control"
                name="ten_khach_hang"
                value={formData.ten_khach_hang}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Số điện thoại</label>
              <input
                type="text"
                className="form-control"
                name="so_dien_thoai"
                value={formData.so_dien_thoai}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Ngày sinh</label>
              <input
                type="date"
                className="form-control"
                name="ngay_sinh"
                value={formData.ngay_sinh}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Giới tính</label>
              <div>
                <label>
                  <input
                    type="radio"
                    name="gioi_tinh"
                    value="Nam"
                    checked={formData.gioi_tinh === true}
                    onChange={() => handleGenderChange(true)}
                  />{" "}
                  Nam
                </label>
                <label className="ms-3">
                  <input
                    type="radio"
                    name="gioi_tinh"
                    value="Nữ"
                    checked={formData.gioi_tinh === false}
                    onChange={() => handleGenderChange(false)}
                  />{" "}
                  Nữ
                </label>
              </div>
            </div>

            <button className="btn btn-warning">
              <VscSave className="icon" /> Thêm khách hàng
            </button>
          </form>
          <button className="btn btn-outline-danger" onClick={handleClose}>
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateForm;
