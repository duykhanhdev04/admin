import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllApi, getDeleteApi } from "../../NhanVienApi";
import NhanVien from "../../pages/NhanVien";
import CreateForm from "./CreateForm";
import UpdateForm from "./UpdateForm";
import DetailForm from "./DetailForm";

function NhanVienConfig() {
  const [nhanvien, setNhanVien] = useState([]);
  const [appState, setAppState] = useState({
    Creating: false,
    Updating: false,
    View: false,
    selectedNhanVien: null,
  });

  function getAllNhanVien() {
    getAllApi()
      .then((response) => {
        setNhanVien(response.data);
      })
      .catch((error) => {
        toast.error("Lỗi khi lấy danh sách nhân viên!", error);
      });
  }

  const handleViewNhanVien = (id) => {
    setAppState({
      Creating: false,
      Updating: false,
      View: true,
      selectedNhanVien: id,
    });
  };

  const handleDeleteNhanVien = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa nhân viên này?")) {
      getDeleteApi(id)
        .then(() => {
          toast.success("Xóa nhân viên thành công");
          getAllNhanVien();
        })
        .catch((error) => {
          toast.error("Lỗi khi xóa nhân viên!", error);
        });
    }
  };

  const handleAddNhanVien = () => {
    if (window.confirm("Bạn có chắc chắn muốn thêm nhân viên?")) {
      setAppState({ Creating: true, Updating: false, selectedNhanVien: null });
    }
  };

  const handleEditNhanVien = (nhanVien) => {
    if (window.confirm("Bạn có chắc chắn muốn sửa nhân viên?")) {
      setAppState({
        Creating: false,
        Updating: true,
        View: false,
        selectedNhanVien: nhanVien,
      });
    }
  };

  const handleCloseForm = () => {
    setAppState({ Creating: false, Updating: false, selectedNhanVien: null });
  };

  useEffect(() => {
    getAllNhanVien();
  }, []);

  return (
    <div className="App">
      <ToastContainer position="top-right" autoClose={3000} />

      {!appState.Creating && !appState.Updating && !appState.View && (
        <NhanVien
          nhanvien={nhanvien}
          onAddClick={handleAddNhanVien}
          onDeleteClick={handleDeleteNhanVien}
          onEditClick={handleEditNhanVien}
          onViewClick={(id) => handleViewNhanVien(id)}
        />
      )}

      {appState.Creating && (
        <CreateForm
          handleClose={handleCloseForm}
          getAllNhanVien={getAllNhanVien}
          updatedNhanVien={(newNhanVien) => {
            setNhanVien((prevNhanVien) => [newNhanVien, ...prevNhanVien]);
            handleCloseForm();
          }}
        />
      )}

      {appState.Updating && (
        <UpdateForm
          selectedNhanVien={appState.selectedNhanVien}
          handleClose={handleCloseForm}
          getAllNhanVien={getAllNhanVien}
        />
      )}

      {appState.View && (
        <DetailForm
          selectedNhanVien={appState.selectedNhanVien}
          handleClose={handleCloseForm}
        />
      )}
    </div>
  );
}

export default NhanVienConfig;
