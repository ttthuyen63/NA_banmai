import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { url } from "../../config/api";

export default function KitchenDetail() {
  const params = useParams();
  const kitchenCode = params.kitchenCode;
  const navigate = useNavigate();
  const [kitchenDetailData, setKitchenDetailData] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    getKitchenDetailApi();
  }, []);
  const getKitchenDetailApi = async () => {
    var myHeaders = new Headers();
    myHeaders.append("kitchenCode", `${kitchenCode}`);
    myHeaders.append("Authorization", `Bearer ${token}`);

    // var raw = "";

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      // body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `${url}/kitchen/management/search/find-by-code`,
        requestOptions
      );
      const result = await response.json();
      const data = result?.data;
      setKitchenDetailData(data);
      console.log(data);
    } catch (error) {
      console.log("Error:", error);
    }
    console.log("kitchenCode", kitchenCode);
  };

  const handleBackClick = () => {
    navigate(-1);
    console.log("Back button clicked");
  };
  const gotoEdit = (kitchenCode) => {
    navigate("/kitchenEdit/" + kitchenCode, {
      state: kitchenDetailData,
    });
  };
  const gotoKitchenStaff = (kitchenCode) => {
    navigate("/kitchenStaffDetail/" + kitchenCode);
  };
  return (
    // <div className="container">
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
        <div className="title-header">Thông tin bếp</div>
      </div>
      <div className="content">
        <div className="row">
          <div className="col-sm-6">
            <div className="info-staff">
              <table>
                <tbody>
                  <tr>
                    <th>Mã bếp:</th>
                    <td>{kitchenDetailData?.kitchenCode}</td>
                  </tr>
                  <tr>
                    <th>Tên bếp:</th>
                    <td>{kitchenDetailData?.name}</td>
                  </tr>
                  <tr>
                    <th>Địa chỉ:</th>
                    <td>{kitchenDetailData?.location}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="btn-detail edit-button">
              <button
                onClick={() => {
                  gotoEdit(kitchenDetailData?.kitchenCode, kitchenDetailData);
                }}
                className="btn btn-primary"
              >
                Chỉnh sửa thông tin
              </button>
            </div>
            <div className="btn-detail delete-button">
              <button className="btn btn-primary">Xóa</button>
            </div>
            <div className="btn-detail account-button">
              <button
                onClick={() => {
                  gotoKitchenStaff(kitchenDetailData?.kitchenCode);
                }}
                className="btn btn-primary"
              >
                Xem danh sách thành viên
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
}
