import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import styles from "../../css/Settings.module.css";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const navigate = useNavigate();
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
                        <td>fryjgfdet</td>
                      </tr>
                      <tr>
                        <th>Tên đăng nhập:</th>
                        <td>QL1BPNP</td>
                      </tr>
                      <tr>
                        <th>Loại tài khoản:</th>
                        <td>Tài khoản quản trị</td>
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
                        <td>QL1BPNP</td>
                      </tr>
                      <tr>
                        <th>Họ và tên:</th>
                        <td>Phạm Như Phong</td>
                      </tr>
                      <tr>
                        <th>Ngày sinh:</th>
                        <td>2000-11-14</td>
                      </tr>
                      <tr>
                        <th>Chức vụ:</th>
                        <td>Quản lý</td>
                      </tr>
                      <tr>
                        <th>Bộ phận:</th>
                        <td>Hành chính</td>
                      </tr>
                      <tr>
                        <th>Ngày vào làm:</th>
                        <td>2022-11-14</td>
                      </tr>
                      <tr>
                        <th>Lương cơ bản:</th>
                        <td>100000000</td>
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
