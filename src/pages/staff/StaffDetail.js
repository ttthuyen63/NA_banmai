import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { url } from "../../config/api";
import { currencyFormat } from "../../ultils/constant";

export default function StaffDetail() {
  const params = useParams();
  const personnel_code = params.personnel_code;
  const navigate = useNavigate();
  const [personnelDetailData, setpersonnelDetailData] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    getpersonnelDetailApi();
  }, []);
  const getpersonnelDetailApi = async () => {
    var myHeaders = new Headers();
    myHeaders.append("personnel_code", `${personnel_code}`);
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
        `${url}/personnel/management/search/find-by-code`,
        requestOptions
      );
      const result = await response.json();
      const data = result?.data;
      setpersonnelDetailData(data);
      console.log(data);
    } catch (error) {
      console.log("Error:", error);
    }
    console.log("personnel_code", personnel_code);
  };
  const handleBackClick = () => {
    navigate(-1);
    console.log("Back button clicked");
  };
  const gotoEdit = (personnelCode) => {
    navigate("/staffEdit/" + personnelCode, {
      state: personnelDetailData,
    });
  };
  const gotoAccount = () => {
    navigate("/account");
  };
  console.log("personnelData", personnelDetailData);

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
        <div className="title-header">Thông tin nhân viên</div>
      </div>
      <div className="content">
        <div className="row">
          <div className="col-sm-8">
            <div className="info-staff">
              <table>
                <tbody>
                  <tr>
                    <th>Mã nhân viên:</th>
                    <td>{personnelDetailData?.personnelCode}</td>
                  </tr>
                  <tr>
                    <th>Họ và tên:</th>
                    <td>{personnelDetailData?.fullName}</td>
                  </tr>
                  <tr>
                    <th>Ngày sinh:</th>
                    <td>{personnelDetailData?.birthDate}</td>
                  </tr>
                  <tr>
                    <th>Bộ phận:</th>
                    <td>{personnelDetailData?.part}</td>
                  </tr>
                  <tr>
                    <th>Chức vụ:</th>
                    <td>{personnelDetailData?.position}</td>
                  </tr>
                  <tr>
                    <th>Ngày vào làm:</th>
                    <td>{personnelDetailData?.startDate}</td>
                  </tr>
                  <tr>
                    <th>Lương cơ bản:</th>
                    <td>{currencyFormat(personnelDetailData?.basicSalary)}</td>
                  </tr>
                  {personnelDetailData?.part === "KITCHEN" ? (
                    <tr>
                      <th>Mã bếp:</th>
                      <td>BEP1</td>
                    </tr>
                  ) : (
                    ""
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="btn-detail edit-button">
              <button
                onClick={() => {
                  gotoEdit(
                    personnelDetailData?.personnelCode,
                    personnelDetailData
                  );
                }}
                className="btn btn-primary"
              >
                Chỉnh sửa thông tin
              </button>
            </div>
            <div className="btn-detail delete-button">
              <button className="btn btn-primary">Xóa nhân viên</button>
            </div>
            <div className="btn-detail account-button">
              <button
                onClick={() => {
                  gotoAccount();
                }}
                className="btn btn-primary"
              >
                Tài khoản
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
}
