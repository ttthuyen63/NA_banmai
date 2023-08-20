import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function EditStaff() {
  const navigate = useNavigate();
  const params = useParams();
  const personnel_code = params.personnel_code;
  const { ...stateLocation } = useLocation();
  const itemDetail = stateLocation?.state;

  const { kitchenCode, ...newObject } = itemDetail;
  const handleBackClick = () => {
    navigate(-1);
    console.log("Back button clicked");
  };

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [position, setPosition] = useState("");

  const handleDateChange = (event) => {
    setBirthDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform form submission logic here
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
        <div className="edit-idStaff">Mã nhân viên: </div>
        <div className="row">
          {/* <form onSubmit={handleSubmit}> */}
          <div className="col-sm-6">
            <form>
              <div>
                <div className="edit form-group">
                  <label>Họ:</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="edit form-group">
                  <label>Tên:</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className=" edit form-group">
                  <label>Bộ phận:</label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  >
                    <option value="dept1">Bộ phận 1</option>
                    <option value="dept2">Bộ phận 2</option>
                    {/* Add more options */}
                  </select>
                </div>
                <div className="edit form-group">
                  <label>Lương cơ bản:</label>
                  <input
                    type="text"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
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
                    value={middleName}
                    onChange={(e) => setMiddleName(e.target.value)}
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
                    onChange={(e) => setPosition(e.target.value)}
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="edit-btn-submit">
            <button
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
