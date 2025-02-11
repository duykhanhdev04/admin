import { useEffect, useState } from "react";
import { VscAdd } from "react-icons/vsc";
import { FaPenToSquare } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { format } from "date-fns";
import { FaEye } from "react-icons/fa6";
import { toast } from "react-toastify";
import { MdNavigateNext } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { getAllApi } from "../KhachHangApi";
import Header from "../components/common/Header";

const KhachHang = ({ onAddClick, onDeleteClick, onEditClick, onViewClick }) => {
  const [khachhang, setKhachHang] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    getAllKhachHang();
  }, []);

  function getAllKhachHang() {
    getAllApi()
      .then((response) => {
        setKhachHang(response.data);
      })
      .catch((error) => {
        toast.error("Lỗi khi lấy dữ liệu!", error);
      });
  }

  const filteredNhanVien = khachhang.filter((item) => {
    const matchesSearch = item.ten_khach_hang
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesGender =
      genderFilter === "all" ||
      (genderFilter === "male" && item.gioi_tinh === true) ||
      (genderFilter === "female" && item.gioi_tinh === false);

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && item.trang_thai === true) ||
      (statusFilter === "inactive" && item.trang_thai === false);

    return matchesSearch && matchesGender && matchesStatus;
  });

  const totalPages = Math.ceil(filteredNhanVien.length / itemsPerPage);

  const paginatedNhanVien = filteredNhanVien.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex-1 bg-white text-black overflow-auto relative w-screen">
      <Header title="Khách hàng" />
      <div className="KhachHang p-3">
        <div className="container mt-3">
          <h4 className="title">Danh sách khách hàng</h4>
          <div className="d-flex mb-3 align-items-center">
            <input
              placeholder="Nhập tên khách hàng"
              className="input form-control me-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select
              className="form-select me-2"
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
            >
              <option value="all">Tất cả giới tính</option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
            </select>

            <select
              className="form-select me-2"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="active">Hoạt động</option>
              <option value="inactive">Ngưng hoạt động</option>
            </select>

            <button className="btn btn-warning" onClick={onAddClick}>
              <VscAdd className="icon" /> Thêm khách hàng
            </button>
          </div>

          <table className="table">
            <thead className="table-light">
              <tr>
                <th>STT</th>
                <th>Ảnh</th>
                <th>Mã khách hàng</th>
                <th>Tên khách hàng</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Ngày sinh</th>
                <th>Giới tính</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody className="tbody">
              {paginatedNhanVien.map((item, index) => (
                <tr key={item.id}>
                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td>
                    <img
                      src="https://i.pinimg.com/736x/64/7d/ff/647dff4ee0ec7e59c4aa85ed0aba0ac9.jpg"
                      width={90}
                      alt="Avatar"
                    ></img>
                  </td>
                  <td>{item.ma_khach_hang}</td>
                  <td>{item.ten_khach_hang}</td>
                  <td>{item.email}</td>
                  <td>{item.so_dien_thoai}</td>
                  <td>
                    {item.ngay_sinh
                      ? format(new Date(item.ngay_sinh), "dd/MM/yyyy")
                      : "N/A"}
                  </td>
                  <td>{item.gioi_tinh ? "Nam" : "Nữ"}</td>
                  <td>{item.trang_thai ? "Hoạt động" : "Ngưng hoạt động"}</td>
                  <td>
                    <button
                      className="btn btn-outline-dark btn-sm"
                      onClick={() => onViewClick(item.id)}
                    >
                      <FaEye />
                    </button>
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => onEditClick(item)}
                    >
                      <FaPenToSquare />
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => onDeleteClick(item.id)}
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {paginatedNhanVien.length === 0 && (
            <p className="text-center text-muted">
              Không tìm thấy khách hàng nào.
            </p>
          )}

          <div className="pagination d-flex justify-content-center mt-3">
            <button
              className="btn btn-outline-dark me-1"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <IoIosArrowBack />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`btn btn-outline-warning me-1 ${
                  currentPage === i + 1 ? "active" : ""
                }`}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="btn btn-outline-dark"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              <MdNavigateNext />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KhachHang;
