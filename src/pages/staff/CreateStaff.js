import { faCheck, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { addListpersonel, createPersonel } from "../../redux/personelSlice";
import { useDispatch } from "react-redux";
import { url } from "../../config/api";
import { typeImplementation } from "@testing-library/user-event/dist/type/typeImplementation";
import { Button, Modal } from "react-bootstrap";
import axiosInstance from "../../components/axiosInstance";

export default function CreateStaff() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [part, setPart] = useState(null);
  const [showValidateError, setshowValidateError] = useState(false);
  const [showDupplucateError, setshowDupplucateError] = useState(false);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const personnelCodeRef = useRef(null);
  const partRef = useRef(null);
  const basicSalaryRef = useRef(null);
  const midNameRef = useRef(null);
  const birthDateRef = useRef(null);
  const startDateRef = useRef(null);
  const positionRef = useRef(null);
  const kitchenCodeRef = useRef(null);
  const selectedPartRef = useRef(null); // Thêm tham chiếu cho trường Select Bộ phận
  const selectedPositionRef = useRef(null); // Thêm tham chiếu cho trường Select Chức vụ
  const [showDialog, setshowDialog] = useState(false);
  const [showConfirm, setshowConfirm] = useState(false);

  const data = {
    parts: [
      { key: "KITCHEN", value: "Bếp" },
      { key: "HR", value: "Nhân sự" },
      { key: "MANAGEMENT", value: "Quản lý" },
    ],
    positions: [
      { key: "PERSONNEL", value: "Nhân viên" },
      { key: "MANAGER", value: "Quản lý" },
    ],
  };

  const partOptions = data.parts.map((option) => ({
    label: option?.value,
    value: option?.key,
  }));

  const positionOptions = data.positions.map((option) => ({
    label: option.value,
    value: option.key,
  }));

  const [selectedPart, setSelectedPart] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");

  const handleBackClick = () => {
    navigate("/");
    console.log("Back button clicked");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    console.log("token", token);

    const dataToSend = {
      firstName: firstNameRef?.current?.value,
      lastName: lastNameRef?.current?.value,
      personnelCode: personnelCodeRef?.current?.value,
      part: selectedPart?.value,
      basicSalary: basicSalaryRef?.current?.value,
      midName: midNameRef?.current?.value,
      birthDate: birthDateRef?.current?.value,
      startDate: startDateRef?.current?.value,
      kitchenCode: kitchenCodeRef?.current?.value,
      position: selectedPosition?.value,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axiosInstance.post(
        `${url}/personnel/management/create`,
        dataToSend,
        config
      );

      if (!response.data.success) {
        // Xử lý lỗi khi tạo nhân viên không thành công
        const errorResponse = response.data;
        setshowValidateError(
          errorResponse.errorMessage.includes("Validation") || null
        );
        setshowDupplucateError(errorResponse.errorCode === 1001 || null);
        console.log("Error response:", errorResponse);
        setshowConfirm(false);
      } else {
        // Xử lý khi tạo nhân viên thành công
        const result = response.data;
        console.log(result);
        setshowConfirm(false);
        setshowDialog(true);
        const timeOut = setTimeout(() => {
          navigate(-1);
        }, 2000);
      }
    } catch (error) {
      console.log("Error:", error);
      // Xử lý lỗi khi gọi API không thành công
      // setError(true);
    }
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
        <Modal.Body>Bạn có chắc chắn muốn thêm nhân viên?</Modal.Body>
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
        {/* <Modal.Header closeButton>
          <Modal.Title>Thành công!!</Modal.Title>
        </Modal.Header> */}
        <Modal.Body style={{ textAlign: "center" }}>
          <FontAwesomeIcon
            icon={faCheck}
            style={{ color: "green", fontSize: "80px" }}
          />
          <div>Bạn đã thêm nhân viên mới!!</div>
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
        <div className="title-header">Thêm thông tin nhân viên</div>
      </div>
      <div className="container">
        <div className="create row">
          {/* <form onSubmit={handleSubmit}> */}
          <div className="col-sm-6">
            <form>
              <div>
                <div className="create form-group">
                  <label>Họ:</label>
                  <input ref={firstNameRef} type="text" placeholder="Nhập họ" />
                </div>
                <div className="create form-group">
                  <label>Tên:</label>
                  <input ref={lastNameRef} type="text" placeholder="Nhập tên" />
                </div>
                <div className=" create form-group">
                  <label>Mã nhân viên:</label>
                  <input
                    ref={personnelCodeRef}
                    type="text"
                    placeholder="Nhập mã nhân viên"
                  />
                </div>

                <div className=" create select form-group">
                  <label>Bộ phận:</label>
                  <div className="select-part">
                    <Select
                      options={partOptions}
                      value={selectedPart}
                      ref={selectedPartRef}
                      placeholder="Bộ phận"
                      onChange={(selectedOption) => {
                        setSelectedPart(selectedOption);
                        selectedPartRef.current.value = selectedOption.value; // Cập nhật giá trị vào biến ref
                      }}
                    />
                  </div>
                </div>
                {selectedPart?.value === "KITCHEN" && ( // Hiển thị input mã bếp nếu chọn "Bếp"
                  <div className="create form-group">
                    <label>Mã bếp:</label>
                    <input
                      type="text"
                      ref={kitchenCodeRef}
                      placeholder="Nhập mã bếp"
                    />
                  </div>
                )}

                <div className="create form-group">
                  <label>Lương cơ bản:</label>
                  <input
                    ref={basicSalaryRef}
                    type="text"
                    placeholder="Nhập lương cơ bản"
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="col-sm-6">
            <form>
              <div>
                <div className="create form-group">
                  <label>Tên đệm:</label>
                  <input
                    ref={midNameRef}
                    type="text"
                    placeholder="Nhập tên đệm"
                  />
                </div>
                <div className="create form-group">
                  <label>Ngày sinh:</label>
                  <input type="date" ref={birthDateRef} />
                </div>
                <div className="create form-group">
                  <label>Ngày vào làm:</label>
                  <input type="date" ref={startDateRef} />
                </div>
                <div className="create select form-group">
                  <label>Chức vụ:</label>
                  <div className="select-part">
                    <Select
                      // className="select-part"
                      options={positionOptions}
                      value={selectedPosition}
                      ref={selectedPositionRef}
                      placeholder="Chức vụ"
                      onChange={(selectedOption) => {
                        setSelectedPosition(selectedOption);
                        selectedPositionRef.current.value =
                          selectedOption.value; // Cập nhật giá trị vào biến ref
                      }}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
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
              style={{ width: "25%" }}
              onClick={(e) => {
                e.preventDefault();
                handleClickConfirm();
              }}
            >
              Xác nhận
            </button>
          </div>
          {/* </form> */}
        </div>
      </div>
    </div>
  );
}
