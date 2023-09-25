import { faCheck, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { url } from "../../config/api";
import { Button, Modal } from "react-bootstrap";
import axiosInstance from "../../components/axiosInstance";

export default function CreateKitchen() {
  const navigate = useNavigate();
  const kitchenCodeRef = useRef(null);
  const nameRef = useRef(null);
  const locationRef = useRef(null);
  const [showDialog, setshowDialog] = useState(false);
  const [showConfirm, setshowConfirm] = useState(false);
  const [showValidateError, setshowValidateError] = useState(false);
  const [showDupplucateError, setshowDupplucateError] = useState(false);
  const handleSubmit = async (e) => {
    const token = sessionStorage.getItem("token");
    console.log("token", token);

    const dataToSend = {
      kitchenCode: kitchenCodeRef?.current?.value,
      name: nameRef?.current?.value,
      location: locationRef?.current?.value,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axiosInstance.post(
        `${url}/kitchen/management/create`,
        dataToSend,
        config
      );

      if (response.status == 200) {
        const result = response.data;
        console.log(result);
        setshowConfirm(false);
        setshowDialog(true);
        const timeOut = setTimeout(() => {
          navigate("/kitchenManager");
        }, 2000);
      }
    } catch (error) {
      const errorResponse = error?.response?.data;
      setshowValidateError(
        errorResponse?.errorMessage.includes("Validation") || null
      );
      setshowDupplucateError(errorResponse?.errorCode == "1001" || null);
      console.log("error", error);
      setshowConfirm(false);
    }
  };

  const handleBackClick = () => {
    navigate(-1);
    console.log("Back button clicked");
  };

  const handleClickConfirm = () => {
    setshowConfirm(true);
  };
  const handleClose = () => {
    setshowDialog(false);
    setshowConfirm(false);
  };
  return (
    <div>
      <Modal show={showConfirm} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận thêm</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc chắn muốn thêm bếp mới?</Modal.Body>
        <Modal.Footer style={{ display: "flex", justifyContent: "center" }}>
          <Button
            style={{
              backgroundColor: "#baeaff",
              border: "none",
              color: "black",
            }}
            // onClick={() => handleDelete(item?.id)
            onClick={handleSubmit}
            // }
          >
            Chắc chắn
          </Button>
          <Button
            style={{
              backgroundColor: "#ffbacf",
              border: "none",
              color: "black",
            }}
            onClick={handleClose}
          >
            Không
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showDialog} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thành công!!</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: "center" }}>
          <FontAwesomeIcon
            icon={faCheck}
            style={{ color: "green", fontSize: "80px" }}
          />
          <div>Bạn đã thêm bếp mới!!</div>
        </Modal.Body>
        {/* <Modal.Footer
          style={{ display: "flex", justifyContent: "center" }}
        ></Modal.Footer> */}
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
        <div className="title-header">Thêm thông tin bếp</div>
      </div>
      <div className="content">
        <div className="container">
          <div className="container-center">
            <form className="create-acc-form">
              <div className="create-acc form-group">
                <label>Mã bếp:</label>
                <input
                  ref={kitchenCodeRef}
                  type="text"
                  placeholder="Nhập mã bếp"
                />
              </div>
              <div className="create-acc form-group">
                <label>Tên bếp:</label>
                <input ref={nameRef} type="text" placeholder="Nhập tên bếp" />
              </div>
              <div className=" create-acc form-group">
                <label>Địa chỉ:</label>
                <input
                  ref={locationRef}
                  type="text"
                  placeholder="Nhập địa chỉ"
                />
              </div>
            </form>
            {showValidateError ? (
              <div
                style={{
                  marginBottom: "26px",
                  color: "red",
                  textAlign: "center",
                }}
              >
                Thông tin bạn nhập vào không hợp lệ!{" "}
              </div>
            ) : (
              ""
            )}
            {showDupplucateError ? (
              <div
                style={{
                  color: "red",
                  textAlign: "center",
                }}
              >
                Mã nhân viên này đã tồn tại!
              </div>
            ) : (
              ""
            )}
            <div className="create-btn-submit">
              <button
                type="submit"
                className="btn btn-primary"
                // style={{ width: "25%" }}
                onClick={(e) => {
                  e.preventDefault();
                  handleClickConfirm();
                }}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
