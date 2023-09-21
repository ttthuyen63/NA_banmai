import { faCheck, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { url } from "../../config/api";
import axiosInstance from "../../components/axiosInstance";
import Select from "react-select";

export default function AddAccount() {
  const navigate = useNavigate();
  const params = useParams();
  const personnelCode = params.personnelCode;
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showDialog, setshowDialog] = useState(false);
  const userNameRef = useRef(null);
  const passWordRef = useRef(null);
  const retypePasswordRef = useRef(null);
  const accountTypeRef = useRef(null);
  const { ...stateLocation } = useLocation();
  const itemDetail = stateLocation?.state;

  const handleClose = () => {
    setshowDialog(false);
  };

  const data = {
    typeAccount: [
      { key: "ADMIN", value: "Quản trị" },
      { key: "PERSONNEL", value: "Nhân viên" },
    ],
  };

  const typeAccountOptions = data.typeAccount.map((option) => ({
    label: option?.value,
    value: option?.key,
  }));

  const [selectedTypeAccount, setselectedTypeAccount] = useState("");

  const handleSubmit = async (e) => {
    const token = sessionStorage.getItem("token");
    console.log("token", token);

    const dataToSend = {
      username: userNameRef?.current?.value,
      password: passWordRef?.current?.value,
      retypePassword: retypePasswordRef?.current?.value,
      accountType: selectedTypeAccount?.value,
      personnelCode: personnelCode,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axiosInstance.post(
        `${url}/account/management/create/user`,
        dataToSend,
        config
      );

      if (!response.status === 200) {
        const errorResponse = response.data;
        // setshowValidateError(
        //   errorResponse.errorMessage.includes("Validation") || null
        // );
        // setshowDupplucateError(errorResponse.errorCode == 1001 || null);
        console.log("Error response:", errorResponse);
      } else {
        const result = response.data;
        console.log(result);
        setshowDialog(true);
        const timeOut = setTimeout(() => {
          navigate(-2);
        }, 2000);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const handleBackClick = () => {
    navigate(-1);
    console.log("Back button clicked");
  };
  return (
    <div>
      <Modal show={showDialog} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Success!!</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: "center" }}>
          <FontAwesomeIcon
            icon={faCheck}
            style={{ color: "green", fontSize: "80px" }}
          />
          <div>
            Bạn đã thêm tài khoản cho nhân viên {itemDetail?.fullName} !!
          </div>
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
        <div className="title-header">Tạo tài khoản</div>
      </div>
      <div className="content">
        <div className="container">
          <div className="container-center">
            <form className="create-acc-form">
              <div className="create-acc form-group">
                <label>Loại tài khoản:</label>
                <div className="select-type-account">
                  <Select
                    options={typeAccountOptions}
                    value={selectedTypeAccount}
                    ref={accountTypeRef}
                    placeholder="Loại tài khoản"
                    onChange={(selectedTypeAccount) => {
                      setselectedTypeAccount(selectedTypeAccount);
                      accountTypeRef.current.value = selectedTypeAccount.value; // Cập nhật giá trị vào biến ref
                    }}
                  />
                </div>
              </div>

              <div className="create-acc form-group">
                <label>Tên đăng nhập:</label>
                <input type="text" ref={userNameRef} />
              </div>
              <div className="create-acc form-group">
                <label>Mật khẩu:</label>
                <input type="password" ref={passWordRef} />
              </div>
              <div className=" create-acc form-group">
                <label>Nhập lại mật khẩu:</label>
                <input type="password" ref={retypePasswordRef} />
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
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
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
