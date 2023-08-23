import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import styles from "../../css/Settings.module.css";
import { useNavigate } from "react-router-dom";
import { urlAdmin } from "../../config/api";
import Options from "../../components/Options";

export default function Settings() {
  const navigate = useNavigate();
  const [usernameData, setusernameData] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    getusernameDataApi();
  }, []);
  const getusernameDataApi = async () => {
    var myHeaders = new Headers();
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
        `${urlAdmin}/authentication/authenticated/me`,
        requestOptions
      );
      const result = await response.json();
      const data = result?.data;
      setusernameData(data);
      console.log(data);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  console.log("usernameData", usernameData);
  return (
    <div className="row">
      <div className="col-sm-2">
        <Sidebar />
      </div>

      <div className="col-sm-10">
        <div className="content">
          <div className="detail-header">
            <div className="title-header">Cài đặt</div>
          </div>
          <div className={styles.contentSetting}>
            <div className={styles.ContentSettingHeader}>Username</div>
            <div className="row">
              <div className="col-sm-8">
                <div className={styles.ContentSettingTitle}>Tài khoản</div>
                <div className={styles.ContentSettingAccount}>
                  <table>
                    <tbody>
                      <tr>
                        <th>Id tài khoản:</th>
                        <td>{usernameData?.id}</td>
                      </tr>
                      <tr>
                        <th>Tên đăng nhập:</th>
                        <td>{usernameData?.username}</td>
                      </tr>
                      <tr>
                        <th>Loại tài khoản:</th>
                        <td>{usernameData?.accountType}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className={styles.ContentSettingTitle}>
                  Thông tin cá nhân
                </div>
                <div className={styles.ContentSettingAccount}>
                  <table>
                    <tbody>
                      <tr>
                        <th>Mã nhân viên:</th>
                        <td>{usernameData?.personnelInfo?.personnelCode}</td>
                      </tr>
                      <tr>
                        <th>Họ và tên:</th>
                        <td>{usernameData?.displayName}</td>
                      </tr>
                      <tr>
                        <th>Ngày sinh:</th>
                        <td>{usernameData?.personnelInfo?.birthDate}</td>
                      </tr>
                      <tr>
                        <th>Chức vụ:</th>
                        <td>
                          <Options
                            position={usernameData?.personnelInfo?.position}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th>Bộ phận:</th>
                        <td>
                          <Options part={usernameData?.personnelInfo?.part} />
                        </td>
                      </tr>
                      <tr>
                        <th>Ngày vào làm:</th>
                        <td>{usernameData?.personnelInfo?.startDate}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-sm-4">
                <div
                  className={styles.btnChangePassword}
                  // onClick={() => submit()}
                >
                  <button>Đổi mật khẩu</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
