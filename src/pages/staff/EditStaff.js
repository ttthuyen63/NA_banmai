import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { url } from "../../config/api";
import Select from "react-select";
import { Button, Container, Modal, Tooltip } from "react-bootstrap";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    padding: "4px",
    borderRadius: "8px",
  }),
};

export default function EditStaff() {
  const navigate = useNavigate();
  const params = useParams();
  const personnelCode = params.personnelCode;
  const { ...stateLocation } = useLocation();
  const itemDetail = stateLocation?.state;
  const [error, setError] = useState(false);

  const { kitchenCode, fullName, isOutOfWord, startDate, ...newObject } =
    itemDetail;
  console.log("nameObject...", newObject);

  const [splittedStrings, setSplittedStrings] = useState([]);
  useEffect(() => {
    const strings = fullName?.split(" ");
    setSplittedStrings(strings);
  }, []);
  const [basicSalary, setbasicSalary] = useState(itemDetail?.basicSalary);
  const [birthDate, setbirthDate] = useState(itemDetail?.birthDate);
  const [firstName, setfirstName] = useState("");
  const [midName, setmidName] = useState("");
  const [lastName, setlastName] = useState("");
  const [part, setpart] = useState(itemDetail?.part);
  const [position, setposition] = useState(itemDetail?.position);
  // const [startDate, setstartDate] = useState(itemDetail?.startDate);
  const [kitchen_code, setkitchen_code] = useState(itemDetail?.kitchenCode);
  const [personnel_code, setpersonnel_code] = useState(
    itemDetail?.personnelCode
  );
  const [showConfirm, setshowConfirm] = useState(false);

  useEffect(() => {
    setfirstName(splittedStrings[0] || "");
    setmidName(splittedStrings[1] || "");
    setlastName(splittedStrings[2] || "");
  }, [splittedStrings]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleDateChange = (event) => {
    setbirthDate(event.target.value);
  };

  const data = {
    parts: [
      { key: "KITCHEN", value: "Bếp" },
      { key: "HR", value: "Hành chính" },
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

  const [selectedPart, setSelectedPart] = useState(itemDetail?.part);
  const [selectedPosition, setSelectedPosition] = useState(
    itemDetail?.position
  );

  console.log("newObject", newObject);

  const handleSubmit = async (e) => {
    // e.preventDefault();
    const token = localStorage.getItem("token");
    var myHeaders = new Headers();
    myHeaders.append("personnelCode", `${personnelCode}`);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    var raw = JSON.stringify({
      data: {
        ...newObject,
        basicSalary: basicSalary,
        birthDate: birthDate,
        firstName: firstName,
        kitchenCode: kitchen_code,
        lastName: lastName,
        midName: midName,
        part: part,
        position: position,
      },
      updateFields: [
        "firstName",
        "midName",
        "lastName",
        "birthDate",
        "position",
        "part",
        "basicSalary",
        "kitchenCode",
      ],
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `${url}/personnel/management/update`,
        requestOptions
      );
      if (!response.ok) {
        // Nếu response không thành công, set state error và thông báo lỗi
        setError(true);
        setshowConfirm(false);
      } else {
        const result = await response.text();
        navigate(-1);
      }
    } catch (error) {
      setError(true);
    }
  };

  const handleClickConfirm = () => {
    setshowConfirm(true);
  };

  const handleClose = () => {
    setshowConfirm(false);
  };
  return (
    <div className="staffDetail">
      <Modal show={showConfirm} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận chỉnh sửa</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc chắn muốn chỉnh sửa?</Modal.Body>
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
      <div className="detail-header">
        <div
          className="back-button-header"
          onClick={() => {
            handleBackClick();
          }}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>
        <div className="title-header">Chỉnh sửa thông tin nhân viên</div>
      </div>

      <div className="container">
        <div className="edit-idStaff">Mã nhân viên: {personnelCode} </div>
        <div className="row">
          {/* <form onSubmit={handleSubmit}> */}
          <div className="col-sm-6">
            <form>
              <div>
                <div className="edit form-group">
                  <label>Họ:</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setfirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="edit form-group">
                  <label>Tên:</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setlastName(e.target.value)}
                    required
                  />
                </div>
                <div className="edit form-group">
                  <label>Bộ phận:</label>
                  <div className="edit-select">
                    <Select
                      styles={customStyles}
                      className="select-option"
                      options={partOptions}
                      isClearable={true}
                      value={
                        part === "KITCHEN"
                          ? { value: "KITCHEN", label: "Bếp" }
                          : partOptions.find((option) => option.value === part)
                      }
                      onChange={(selectedOption) => {
                        if (selectedOption?.value === "KITCHEN") {
                          setpart("KITCHEN");
                          setkitchen_code(""); // Reset mã bếp khi chọn "KITCHEN"
                        } else {
                          setpart(selectedOption?.value);
                        }
                      }}
                    />
                  </div>
                </div>
                {part === "KITCHEN" && ( // Hiển thị input mã bếp nếu chọn "Bếp"
                  <div className="edit form-group">
                    <label>Mã bếp:</label>
                    <input
                      type="text"
                      value={kitchen_code}
                      onChange={(e) => setkitchen_code(e.target.value)}
                      required
                    />
                  </div>
                )}
                <div className="edit form-group">
                  <label>Lương cơ bản:</label>
                  <input
                    type="text"
                    value={basicSalary}
                    onChange={(e) => setbasicSalary(e.target.value)}
                    required
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="col-sm-6">
            <form>
              <div>
                <div className="edit form-group">
                  <label>Tên đệm:</label>
                  <input
                    type="text"
                    value={midName}
                    onChange={(e) => setmidName(e.target.value)}
                    required
                  />
                </div>
                <div className="edit form-group">
                  <label>Ngày sinh:</label>
                  <input
                    type="date"
                    value={birthDate}
                    onChange={handleDateChange}
                  />
                </div>
                <div className="edit form-group">
                  {/* <label>Chức vụ:</label>
                  <input
                    type="text"
                    value={position}
                    onChange={(e) => setposition(e.target.value)}
                  /> */}
                  <label>Chức vụ:</label>
                  <div className="edit-select">
                    <Select
                      styles={customStyles}
                      className="select-option"
                      options={positionOptions}
                      isClearable={true}
                      value={positionOptions.find(
                        (option) => option.value === position
                      )}
                      onChange={(e) => setposition(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
          {error ? (
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
          <div className="edit-btn-submit">
            <button
              onClick={() => handleClickConfirm()}
              type="submit"
              style={{ width: "25%" }}
              className="btn btn-primary"
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
