import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { url } from "../../config/api";
import CryptoJS from "crypto-js";
import { useDispatch } from "react-redux";
import { setAccount } from "../../redux/accountSlice";

export default function Account() {
  const navigate = useNavigate();
  const params = useParams();
  const personnelCode = params.personnelCode;
  const [accountByCodelData, setaccountByCodelData] = useState([]);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const handleBackClick = () => {
    navigate(-1);
    console.log("Back button clicked");
  };
  const gotoResetPass = (id) => {
    navigate("/updatePassword");
  };
  useEffect(() => {
    getaccountByCodeApi();
  }, []);
  const getaccountByCodeApi = async () => {
    var myHeaders = new Headers();
    myHeaders.append("personnelCode", `${personnelCode}`);
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
        `${url}/account/management/search/find-by-personnel-code`,
        requestOptions
      );
      const result = await response.json();
      const data = result?.data;
      setaccountByCodelData(data);
      dispatch(setAccount(data));
      console.log(data);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const gotoAccount = () => {
    navigate("/account");
  };
  console.log("accountByCodelData", accountByCodelData);
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
        <div className="title-header">Tài khoản nhân viên</div>
      </div>
      <div className="content">
        <div className="row">
          <div className="col-sm-6">
            <div className="info-staff">
              <table>
                <tbody>
                  <tr>
                    <th>ID tài khoản:</th>
                    <td>{accountByCodelData?.id}</td>
                  </tr>
                  <tr>
                    <th>Mã nhân viên:</th>
                    <td>{accountByCodelData?.personnelCode}</td>
                  </tr>
                  <tr>
                    <th>Tên đăng nhập:</th>
                    <td>{accountByCodelData?.username}</td>
                  </tr>
                  <tr>
                    <th>Loại tài khoản:</th>
                    <td>{accountByCodelData?.accountType}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="btn-detail edit-button">
              <button
                onClick={() => {
                  gotoResetPass(accountByCodelData?.id);
                }}
              >
                Cập nhật mật khẩu
              </button>
            </div>
            <div className="btn-detail delete-button">
              <button>Xóa tài khoản</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
