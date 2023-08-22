import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { url } from "../../config/api";
import { currencyFormat } from "../../ultils/constant";
import { Button, Container, Modal, Tooltip } from "react-bootstrap";

export default function StaffDetail() {
  const params = useParams();
  const personnelCode = params.personnelCode;
  const navigate = useNavigate();
  const [personnelDetailData, setpersonnelDetailData] = useState([]);
  const [accountByCodelData, setaccountByCodelData] = useState([]);
  const [showDel, setshowDel] = useState(false);
  const [deleteCode, setdeleteCode] = useState("");

  const token = localStorage.getItem("token");
  useEffect(() => {
    getpersonnelDetailApi();
  }, []);
  const getpersonnelDetailApi = async () => {
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
    console.log("personnelCode", personnelCode);
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
      console.log(data);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  console.log("accountByCodelData", accountByCodelData);
  const handleBackClick = () => {
    navigate(-1);
    console.log("Back button clicked");
  };
  const gotoEdit = (personnelCode) => {
    navigate("/staffEdit/" + personnelCode, {
      state: personnelDetailData,
    });
  };

  const handleClose = () => {
    setshowDel(false);
  };

  const handleClickDelete = (code) => {
    setdeleteCode(code);
    setshowDel(true);
    // console.log("id...", id);
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    console.log("token", token);
    var myHeaders = new Headers();
    myHeaders.append("personnelCode", `${personnelCode}`);
    myHeaders.append("removeType", "REMOVE");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `${url}/personnel/management/remove`,
        requestOptions
      );
      const result = await response.text();
      console.log(result);
      navigate(-1); // Chuyển hướng sau khi tạo thành công
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const gotoAccount = (code) => {
    if (accountByCodelData == null) {
      navigate("/emptyAccount");
    } else {
      navigate("/account" + code);
    }
    //
  };
  console.log("personnelData", personnelDetailData);

  return (
    // <div className="container">
    <div className="staffDetail">
      <div>
        <Modal show={showDel} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Xác nhận xóa</Modal.Title>
          </Modal.Header>
          <Modal.Body>Bạn có chắc chắn muốn xóa?</Modal.Body>
          <Modal.Footer style={{ display: "flex", justifyContent: "center" }}>
            <Button
              style={{
                backgroundColor: "#baeaff",
                border: "none",
                color: "black",
              }}
              // onClick={() => handleDelete(item?.id)
              onClick={handleDelete}
              // }
            >
              Chắc chắn
            </Button>
            <Button
              style={{
                backgroundColor: "#ffbacf",
                border: "none",
                color: "black",
              }}
              onClick={handleClose}
            >
              Không
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
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
              <button
                className="btn btn-primary"
                onClick={() =>
                  handleClickDelete(personnelDetailData?.personnelCode)
                }
              >
                Xóa nhân viên
              </button>
            </div>
            <div className="btn-detail account-button">
              <button
                onClick={() => {
                  gotoAccount(personnelDetailData?.personnelCode);
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
