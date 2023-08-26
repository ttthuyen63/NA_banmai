import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import styles from "../../css/Settings.module.css";
import { useNavigate } from "react-router-dom";
import { urlAdmin } from "../../config/api";
import Options from "../../components/Options";
import { Button, Modal } from "react-bootstrap";

export default function Settings() {
  const navigate = useNavigate();
  const [usernameData, setusernameData] = useState([]);
  const currentPasswordRef = useRef(null);
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

  const handleSubmit = async (e) => {
    const token = localStorage.getItem("token");
    console.log("token", token);
    var myHeaders = new Headers();
    myHeaders.append(
      "currentPassword",
      `${currentPasswordRef?.current?.value}`
    );
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `${urlAdmin}/authentication/authenticated/generate/token/change-password`,
        requestOptions
      );
      const result = await response.json();
      console.log(result.data.changePasswordToken);
      localStorage.setItem(
        "tokenChangePassword",
        result.data.changePasswordToken
      );
      navigate("/changePassword");
    } catch (error) {
      setError(true);
      setSubmitError(true);
    }
  };

  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [showSidebarDialog, setShowSidebarDialog] = useState(false);

  const [showDialog, setshowDialog] = useState(false);
  const handleClose = () => {
    setshowDialog(false);
  };
  const handleClickChangePassword = () => {
    setshowDialog(true);
  };
  const [error, setError] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  return (
    <div className="row">
      <Modal show={showDialog} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nhập mật khẩu hiện tại</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <input
              ref={currentPasswordRef}
              type="password"
              placeholder="Nhập mật khẩu hiện tại"
              style={{ width: "100%", padding: "10px", borderRadius: "8px" }}
            />
          </div>
          {submitError ? (
            <div style={{ marginBottom: "26px", color: "red" }}>
              Mật khẩu không đúng!{" "}
            </div>
          ) : (
            ""
          )}
        </Modal.Body>
        <Modal.Footer style={{ display: "flex", justifyContent: "center" }}>
          <Button
            style={{
              backgroundColor: "#baeaff",
              border: "none",
              color: "black",
            }}
            // onClick={() => handleDelete(item?.id)
            onClick={() => handleSubmit()}
            // }
          >
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>

      {sidebarVisible && (
        <div className="col-sm-2">
          <Sidebar />
        </div>
      )}
      <Modal
        show={showSidebarDialog}
        onHide={() => setShowSidebarDialog(false)}
        dialogClassName="sidebar-dialog"
        contentClassName="d-flex flex-column"
        style={{
          top: 0,
          left: 0,
          transform: "none",
          position: "fixed",
          margin: 0,
          width: "40%",
          height: "85%",
        }}
      >
        <Modal.Body className="p-0">
          <Sidebar />
        </Modal.Body>
      </Modal>

      {/* <div className="col-sm-10"> */}
      <div className={sidebarVisible ? "content col-sm-10" : "content col-12"}>
        <div className="content-header">
          <div className="detail-header">
            <button
              className=" faBars"
              onClick={() => {
                setShowSidebarDialog(!showSidebarDialog);
              }}
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
            <div className="title-header">Cài đặt</div>
          </div>
          <div className={styles.contentSetting}>
            <div className={styles.ContentSettingHeader}>
              {usernameData?.username}
            </div>
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
                  onClick={() => handleClickChangePassword()}
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
