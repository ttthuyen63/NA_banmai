import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { url } from "../../config/api";
import Select from "react-select";

export default function EditStaff() {
  const navigate = useNavigate();
  const params = useParams();
  const personnelCode = params.personnelCode;
  const { ...stateLocation } = useLocation();
  const itemDetail = stateLocation?.state;

  const { kitchenCode, fullName, ...newObject } = itemDetail;
  console.log("nameObject...", newObject);

  const [splittedStrings, setSplittedStrings] = useState([]);
  useEffect(() => {
    const strings = fullName?.split(" ");
    setSplittedStrings(strings);
  }, []);
  console.log("splittedStrings", typeof splittedStrings[0]);
  const [basicSalary, setbasicSalary] = useState(itemDetail?.basicSalary);
  const [birthDate, setbirthDate] = useState(itemDetail?.birthDate);
  const [firstName, setfirstName] = useState("");
  const [midName, setmidName] = useState("");
  const [lastName, setlastName] = useState("");
  const [part, setpart] = useState(itemDetail?.part);
  const [position, setposition] = useState(itemDetail?.position);
  const [startDate, setstartDate] = useState(itemDetail?.startDate);
  const [kitchen_code, setkitchen_code] = useState(itemDetail?.kitchenCode);
  const [personnel_code, setpersonnel_code] = useState(
    itemDetail?.personnelCode
  );

  useEffect(() => {
    setfirstName(splittedStrings[0] || "");
    setmidName(splittedStrings[1] || "");
    setlastName(splittedStrings[2] || "");
  }, [splittedStrings]);

  const handleBackClick = () => {
    navigate(-1);
    console.log("Back button clicked");
  };

  const handleDateChange = (event) => {
    setbirthDate(event.target.value);
  };

  const data = {
    parts: [
      { key: "KITCHEN", value: "Bếp" },
      { key: "HR", value: "Human Resources" },
      { key: "MANAGEMENT", value: "Hành chính" },
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
    e.preventDefault();
    const token = localStorage.getItem("token");
    console.log("token", token);
    var myHeaders = new Headers();
    myHeaders.append("personnelCode", `${personnelCode}`);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    var raw = JSON.stringify({
      data: {
        ...newObject,
        personnelCode: personnel_code,
        basicSalary: basicSalary,
        birthDate: birthDate,
        firstName: firstName,
        midName: midName,
        lastName: lastName,
        part: part,
        position: position,
        // startDate: startDate,
        kitchenCode: kitchenCode,
      },
      updateFields: [
        "basicSalary",
        "birthDate",
        "firstName",
        "midName",
        "lastName",
        "part",
        "position",
        // "startDate",
        "kitchenCode",
        // "isOutOfWord",
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
      const result = await response.text();
      console.log(result);
      navigate("/");
    } catch (error) {
      console.log("Error:", error);
    }
  };
  return (
    <div className="staffDetail">
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
                  {/* <input
                    type="text"
                    value={part}
                    onChange={(e) => setpart(e.target.value)}
                  /> */}
                  <Select
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
                {part === "KITCHEN" && ( // Hiển thị input mã bếp nếu chọn "Bếp"
                  <div className="create form-group">
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
                  <label>Chức vụ:</label>
                  <input
                    type="text"
                    value={position}
                    onChange={(e) => setposition(e.target.value)}
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="edit-btn-submit">
            <button
              onClick={handleSubmit}
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
