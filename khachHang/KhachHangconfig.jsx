import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DetailForm from "./DetailForm";
import UpdateForm from "./UpdateForm";
import KhachHang from "../../pages/KhachHang";
import CreateForm from "./CreateForm";
import { getAllApi, getDeleteApi } from "../../KhachHangApi";

function KhachHangConfig() {
  const [khachHang, setKhachHang] = useState([]);
  const [appState, setAppState] = useState({
    Creating: false,
    Updating: false,
    View: false,
    selectedKhachHang: null,
  });

  function getAllKhachHang() {
    getAllApi()
      .then((response) => {
        setKhachHang(response.data);
      })
      .catch((error) => {
        toast.error("Lỗi khi lấy danh sách nhân viên!", error);
      });
  }

  const handleViewKhachHang = (id) => {
    setAppState({
      Creating: false,
      Updating: false,
      View: true,
      selectedNhanVien: id,
    });
  };

  const handleDeleteKhachHang = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa khách hàng này?")) {
      getDeleteApi(id)
        .then(() => {
          toast.success("Xóa khách hàng thành công");
          getAllKhachHang();
        })
        .catch((error) => {
          toast.error("Lỗi khi xóa khách hàng!", error);
        });
    }
  };

  const handleAddKhachHang = () => {
    if (window.confirm("Bạn có chắc chắn muốn thêm khách hàng không")) {
      setAppState({ Creating: true, Updating: false, selectedKhachHang: null });
    }
  };

  const handleEditKhachHang = (khachHang) => {
    if (window.confirm("Bạn có chắc chắn muốn sửa khách hàng không")) {
      setAppState({
        Creating: false,
        Updating: true,
        View: false,
        selectedKhachHang: khachHang,
      });
    }
  };

  const handleCloseForm = () => {
    setAppState({
      Creating: false,
      Updating: false,
      View: false,
      selectedKhachHang: null,
    });
  };

  useEffect(() => {
    getAllKhachHang();
  }, []);

  return (
    <div className="App">
      <ToastContainer position="top-right" autoClose={3000} />

      {!appState.Creating && !appState.Updating && !appState.View && (
        <KhachHang
          khachHang={khachHang}
          onAddClick={handleAddKhachHang}
          onDeleteClick={handleDeleteKhachHang}
          onEditClick={handleEditKhachHang}
          onViewClick={handleViewKhachHang}
        />
      )}

      {appState.Creating && (
        <CreateForm
          handleClose={handleCloseForm}
          getAllKhachHang={getAllKhachHang}
          updatedKhachHang={(newKhachHang) => {
            setKhachHang((prevKhachhang) => [newKhachHang, ...prevKhachhang]);
            handleCloseForm();
          }}
        />
      )}

      {appState.Updating && (
        <UpdateForm
          selectedKhachHang={appState.selectedKhachHang}
          handleClose={handleCloseForm}
          getAllKhachHang={getAllKhachHang}
        />
      )}

      {appState.View && (
        <DetailForm
          selectedKhachHang={appState.selectedKhachHang}
          handleClose={handleCloseForm}
        />
      )}
    </div>
  );
}

export default KhachHangConfig;
