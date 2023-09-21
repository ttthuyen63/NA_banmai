import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { url } from "../../config/api";
import axiosInstance from "../../components/axiosInstance";
import { useDispatch } from "react-redux";
import { setAccount } from "../../redux/accountSlice";
import Options from "../../components/Options";

export default function Account() {
  const navigate = useNavigate();
  const params = useParams();
  const personnelCode = params.personnelCode;
  const [accountByCodelData, setaccountByCodelData] = useState([]);
  const token = sessionStorage.getItem("token");
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
    const config = {
      headers: {
        personnelCode: personnelCode,
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axiosInstance.get(
        `${url}/account/management/search/find-by-personnel-code`,
        config
      );

      const data = response.data;
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
          <div className="col-sm-6" style={{ paddingLeft: "40px" }}>
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
                    {/* <td>{accountByCodelData?.accountType}</td> */}
                    <td>
                      <Options typeAccount={accountByCodelData?.accountType} />
                    </td>
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
