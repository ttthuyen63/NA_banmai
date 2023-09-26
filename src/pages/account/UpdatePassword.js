import { faCheck, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axiosInstance from "../../components/axiosInstance";
import { url } from "../../config/api";
import { Button, Modal } from "react-bootstrap";

export default function UpdatePassword() {
  const navigate = useNavigate();
  const newPasswordRef = useRef(null);
  const retypeNewPasswordRef = useRef(null);
  const [showDialog, setshowDialog] = useState(false);
  const accountByCodelData = useSelector((state) => state.account);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = sessionStorage.getItem("token");
    console.log("token", token);

    const dataToSend = {
      username: accountByCodelData?.username,
      newPassword: newPasswordRef?.current?.value,
      retypeNewPassword: retypeNewPasswordRef?.current?.value,
    };

    const config = {
      headers: {
        accountId: accountByCodelData?.id,
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axiosInstance.post(
        `${url}/account/management/update-password`,
        dataToSend,
        config
      );

      const result = response.data;
      console.log(result);
      navigate(`/account/${accountByCodelData?.personnelCode}`); // Chuyển hướng sau khi cập nhật thành công
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const handleBackClick = () => {
    navigate(-1);
  };
  const handleClose = () => {
    setshowDialog(false);
  };
  console.log("accountByCodelData", accountByCodelData);
  return (
    <div>
      <Modal show={showDialog} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thành công!!</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: "center" }}>
          <FontAwesomeIcon
            icon={faCheck}
            style={{ color: "green", fontSize: "80px" }}
          />
          <div>Bạn đã cập nhật mật khẩu thành công!!</div>
        </Modal.Body>
      </Modal>
      <div className="detail-header">
        <div
          className="back-button-header"
          onClick={() => {
            handleBackClick();
          }}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>
        <div className="title-header">Cập nhật mật khẩu</div>
      </div>
      <div className="content">
        <div className="container">
          <div className="container-center">
            <form className="update-password-form">
              <div className="update-password form-group">
                <label>Mật khẩu mới:</label>
                <input
                  ref={newPasswordRef}
                  type="password"
                  // placeholder="Nhập mật khẩu mới"
                />
              </div>
              <div className="update-password form-group">
                <label>Nhập lại mật khẩu mới:</label>
                <input
                  ref={retypeNewPasswordRef}
                  type="password"
                  // placeholder="Nhập lại mật khẩu mới"
                />
              </div>
              <span className="note-password">
                *Mật khẩu yêu cầu tối thiểu 6 kí tự, trong đó bao gồm ít nhất 1
                chữ in hoa, 1 kí tự đặc biệt và số*
              </span>
              <div className="edit-btn-submit">
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: "25%" }}
                  onClick={handleSubmit}
                >
                  Xác nhận
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
