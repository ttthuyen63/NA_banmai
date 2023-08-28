import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { addListpersonel, createPersonel } from "../../redux/personelSlice";
import { useDispatch } from "react-redux";
import { url } from "../../config/api";
import { typeImplementation } from "@testing-library/user-event/dist/type/typeImplementation";

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
    const token = localStorage.getItem("token");
    console.log("token", token);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

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

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(dataToSend),
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `${url}/personnel/management/create`,
        requestOptions
      );
      if (!response.ok) {
        const errorResponse = await response.json(); // Chuyển response thành JSON để truy cập thông tin lỗi
        setshowValidateError(
          errorResponse.errorMessage.includes("Validation") || null
        );
        setshowDupplucateError(errorResponse.errorCode == 1001 || null);
        console.log("Error response:", errorResponse);
      } else {
        const result = await response.text();
        console.log(result);
        navigate(-1);
      }
    } catch (error) {
      // setError(true);
      console.log("error", typeof error);
    }
  };
  console.log("selectedPart", selectedPart);
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
              onClick={handleSubmit}
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
