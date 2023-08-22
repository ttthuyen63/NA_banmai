import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function EmptyAccount() {
  const navigate = useNavigate();
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
        <div className="title-header">Tài khoản nhân viên</div>
      </div>
      <div className="content">
        <div className="empty-account">
          Chưa có tài khoản nào cho nhân viên này:{" "}
          <Link to="/createAccount">Thêm tài khoản</Link>
        </div>
      </div>
    </div>
  );
}
