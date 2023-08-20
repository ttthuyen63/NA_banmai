import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UpdatePassword() {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();

    if (newPassword === confirmNewPassword) {
      // Gửi yêu cầu cập nhật mật khẩu đến máy chủ ở đây
      setMessage("Mật khẩu đã được cập nhật thành công.");
    } else {
      setMessage("Mật khẩu mới không trùng khớp.");
    }
  };
  const handleBackClick = () => {
    navigate("/account");
    console.log("Back button clicked");
  };
  return (
    <div>
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
            <form className="update-password-form" onSubmit={handleSubmit}>
              <div className="update-password form-group">
                <label>Mật khẩu mới:</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="update-password form-group">
                <label>Nhập lại mật khẩu mới:</label>
                <input
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  required
                />
              </div>

              <div className="edit-btn-submit">
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: "25%" }}
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
