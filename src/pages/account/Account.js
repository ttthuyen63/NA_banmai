import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate("/staffDetail");
    console.log("Back button clicked");
  };
  const gotoEditPass = () => {
    navigate("/updatePassword");
  };
  const gotoAccount = () => {
    navigate("/account");
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
                    <td>fgbvc</td>
                  </tr>
                  <tr>
                    <th>Mã nhân viên:</th>
                    <td>QL1BPNP</td>
                  </tr>
                  <tr>
                    <th>Tên đăng nhập:</th>
                    <td>QL1BPNP</td>
                  </tr>
                  <tr>
                    <th>Loại tài khoản:</th>
                    <td>Tài khoản nhân viên</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="btn-detail edit-button">
              <button
                onClick={() => {
                  gotoEditPass();
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
