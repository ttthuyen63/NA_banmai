import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { customAxios, url } from "../../config/api";

export default function CreateKitchen() {
  const navigate = useNavigate();

  const kitchenCodeRef = useRef(null);
  const nameRef = useRef(null);
  const locationRef = useRef(null);

  const handleSubmit = async (e) => {
    const token = localStorage.getItem("token");
    console.log("token", token);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const dataToSend = {
      kitchenCode: kitchenCodeRef?.current?.value,
      name: nameRef?.current?.value,
      location: locationRef?.current?.value,
    };

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(dataToSend),
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `${url}/kitchen/management/create`,
        requestOptions
      );
      const result = await response.text();
      console.log(result);
      navigate("/kitchenManager"); // Chuyển hướng sau khi tạo thành công
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleBackClick = () => {
    navigate("/kitchenManager");
    console.log("Back button clicked");
  };

  console.log("axios..", url);
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
            <div className="create-btn-submit">
              <button
                type="submit"
                className="btn btn-primary"
                // style={{ width: "25%" }}
                onClick={handleSubmit}
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
