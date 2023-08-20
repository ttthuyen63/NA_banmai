import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { url } from "../../config/api";

export default function EditKitchen() {
  const navigate = useNavigate();
  const params = useParams();
  const kitchen_code = params.kitchen_code;
  const { ...stateLocation } = useLocation();
  const itemDetail = stateLocation?.state;

  const { kitchenCode, ...newObject } = itemDetail;
  console.log("nameObject...", newObject);
  // const queryParams = new URLSearchParams(window.location.search);

  const [name, setname] = useState(itemDetail?.name);
  const [location, setlocation] = useState(itemDetail?.location);

  const handleBackClick = () => {
    // navigate("/kitchenDetail");
    navigate(-1);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    console.log("token", token);
    var myHeaders = new Headers();
    myHeaders.append("kitchen_code", `${kitchen_code}`);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    var raw = JSON.stringify({
      data: {
        ...newObject,
        name: name,
        location: location,
      },
      updateFields: ["name", "location"],
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `${url}/kitchen/management/update`,
        requestOptions
      );
      const result = await response.text();
      console.log(result);
      navigate("/kitchenManager"); // Chuyển hướng sau khi tạo thành công
    } catch (error) {
      console.log("Error:", error);
    }
  };
  return (
    <div className="Detail">
      <div className="detail-header">
        <div className="back-button-header" onClick={handleBackClick}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>
        <div className="title-header">Chỉnh sửa thông tin bếp</div>
      </div>
      <div className="content">
        <div className="container">
          <div className="edit-idStaff">Mã bếp: {itemDetail?.kitchenCode}</div>
          <div className="container-center">
            <form className="update-password-form">
              <div className="update-password form-group">
                <label>Tên bếp:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  required
                />
              </div>
              <div className="update-password form-group">
                <label>Địa chỉ:</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setlocation(e.target.value)}
                  required
                />
              </div>

              <div className="edit-btn-submit">
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: "25%" }}
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
