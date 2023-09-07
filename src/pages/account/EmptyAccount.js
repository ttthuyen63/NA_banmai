import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

export default function EmptyAccount() {
  const navigate = useNavigate();
  const params = useParams();
  const personnelCode = params.personnelCode;
  const { ...stateLocation } = useLocation();
  const itemDetail = stateLocation?.state;
  console.log("itemDetail", itemDetail);
  const handleBackClick = () => {
    navigate(-1);
    console.log("Back button clicked");
  };
  const goToCreateAccount = (code) => {
    navigate("/createAccount/" + code, {
      state: itemDetail,
    });
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
          Chưa có tài khoản nào cho nhân viên này:
          <span
            className="text-create-account"
            onClick={() => goToCreateAccount(personnelCode)}
          >
            {" "}
            Thêm tài khoản
          </span>
        </div>
      </div>
    </div>
  );
}
