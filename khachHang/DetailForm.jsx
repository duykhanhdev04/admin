import { useEffect, useState } from "react";
import "./DetailForm.css"; 
import { format } from "date-fns"; 
import { getKhachHangById } from "../../KhachHangApi";
import Header from "../common/Header";

const DetailForm = ({ selectedKhachHang, handleClose }) => {
  const [khachHang, setKhachHang] = useState(null);

  useEffect(() => {
    if (selectedKhachHang) {
      getKhachHangById(selectedKhachHang)
        .then((response) => {
          setKhachHang(response.data);
        })
        .catch((error) => {
          console.error("Lỗi khi lấy thông tin nhân viên:", error);
        });
    }
  }, [selectedKhachHang]);

  if (!khachHang) return <p>Đang tải...</p>;

  return (
    <div className="flex-1 bg-white text-black overflow-auto relative w-screen">
      <Header title="Khách hàng"/>
      <div className="detail-form-container">
        <div className="detail-form-header">
          <h3>Thông tin khách hàng</h3>
          <button className="close-btn" onClick={handleClose}>
            Quay lại
          </button>
        </div>
        <div className="detail-form-content">
          <div className="form-left">
            <div className="avatar">
              <img
                src={
                  khachHang.anh_dai_dien || "https://i.pinimg.com/736x/64/7d/ff/647dff4ee0ec7e59c4aa85ed0aba0ac9.jpg"
                }
                alt="Avatar"
                width="100"
                height="100"
              />
            </div>
            <div className="form-group">
              <label htmlFor="ho-ten">Họ và Tên</label>
              <input
                type="text"
                id="ho-ten"
                value={khachHang.ten_khach_hang || ""}
                readOnly
              />
            </div>
          </div>

          <div className="form-right">
            <div className="form-group">
              <label htmlFor="ngay-sinh">Ngày sinh</label>
              <input
                type="text"
                id="ngay-sinh"
                value={
                  khachHang.ngay_sinh
                    ? format(new Date(khachHang.ngay_sinh), "dd/MM/yyyy")
                    : "N/A"
                }
                readOnly
              />
            </div>
            <div className="form-group">
              <label>Giới tính *</label>
              <div className="gender-options">
                <label>
                  <input
                    type="radio"
                    name="gioi-tinh"
                    value="Nam"
                    checked={khachHang.gioi_tinh === true}
                    readOnly
                  />
                  Nam
                </label>
                <label>
                  <input
                    type="radio"
                    name="gioi-tinh"
                    value="Nữ"
                    checked={khachHang.gioi_tinh === false}
                    readOnly
                  />
                  Nữ
                </label>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={khachHang.email || ""}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="so-dien-thoai">Số điện thoại</label>
              <input
                type="text"
                id="so-dien-thoai"
                value={khachHang.so_dien_thoai || ""}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="trang-thai">Trạng thái</label>
              <input
                type="text"
                id="trang-thai"
                value={khachHang.trang_thai ? "Hoạt động" : "Ngưng hoạt động"}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailForm;
