import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddAccount() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password === confirmPassword) {
      console.log("Registration successful");
    } else {
      console.log("Passwords do not match");
    }
  };
  const handleBackClick = () => {
    navigate(-1);
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
        <div className="title-header">Tạo tài khoản</div>
      </div>
      <div className="content">
        <div className="container">
          <div className="container-center">
            <form className="create-acc-form" onSubmit={handleSubmit}>
              <div className="create-acc form-group">
                <label>Tên đăng nhập:</label>
                <input
                  type="text"
                  // className=" form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="create-acc form-group">
                <label>Mật khẩu:</label>
                <input
                  type="password"
                  // className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className=" create-acc form-group">
                <label>Nhập lại mật khẩu:</label>
                <input
                  type="password"
                  // className="form-control"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
