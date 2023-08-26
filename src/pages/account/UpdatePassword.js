import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { url } from "../../config/api";

export default function UpdatePassword() {
  const navigate = useNavigate();
  const newPasswordRef = useRef(null);
  const retypeNewPasswordRef = useRef(null);
  const accountByCodelData = useSelector((state) => state.account);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    console.log("token", token);
    var myHeaders = new Headers();
    myHeaders.append("accountId", `${accountByCodelData?.id}`);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const dataToSend = {
      username: accountByCodelData?.username,
      newPassword: newPasswordRef?.current?.value,
      retypeNewPassword: retypeNewPasswordRef?.current?.value,
    };

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(dataToSend),
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `${url}/account/management/update-password`,
        requestOptions
      );
      const result = await response.text();
      console.log(result);
      navigate(`/account/${accountByCodelData?.personnelCode}`); // Chuyển hướng sau khi tạo thành công
    } catch (error) {
      console.log("Error:", error);
    }
    // if (newPassword === confirmNewPassword) {
    //   // Gửi yêu cầu cập nhật mật khẩu đến máy chủ ở đây
    //   setMessage("Mật khẩu đã được cập nhật thành công.");
    // } else {
    //   setMessage("Mật khẩu mới không trùng khớp.");
    // }
  };
  const handleBackClick = () => {
    navigate(-1);
  };
  console.log("accountByCodelData", accountByCodelData);
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
