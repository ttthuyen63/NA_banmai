import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { url } from "../../config/api";
import { Button, Container, Modal, Tooltip } from "react-bootstrap";

export default function KitchenDetail() {
  const params = useParams();
  const kitchenCode = params.kitchenCode;
  const navigate = useNavigate();
  const [kitchenDetailData, setKitchenDetailData] = useState([]);
  const [showDel, setshowDel] = useState(false);
  const [deleteCode, setdeleteCode] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const token = sessionStorage.getItem("token");
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
    } finally {
      setIsLoading(false);
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

  const handleClose = () => {
    setshowDel(false);
  };

  const handleClickDelete = (code) => {
    setdeleteCode(code);
    setshowDel(true);
    // console.log("id...", id);
  };

  const handleDelete = async () => {
    const token = sessionStorage.getItem("token");
    console.log("token", token);
    var myHeaders = new Headers();
    myHeaders.append("kitchenCode", `${kitchenCode}`);
    // myHeaders.append("removeType", "REMOVE");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `${url}/kitchen/management/remove`,
        requestOptions
      );
      const result = await response.text();
      console.log(result);
      navigate(-1); // Chuyển hướng sau khi tạo thành công
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const gotoKitchenStaff = (kitchenCode) => {
    navigate("/kitchenStaffDetail/" + kitchenCode);
  };
  const gotoTimesheets = (kitchenCode) => {
    navigate("/timesheets/" + kitchenCode);
  };

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
        <div className="title-header">Thông tin bếp</div>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
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
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    handleClickDelete(kitchenDetailData?.personnelCode)
                  }
                >
                  Xóa
                </button>
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
              <div className="btn-detail attendance-button">
                <button
                  onClick={() => {
                    gotoTimesheets(kitchenDetailData?.kitchenCode);
                  }}
                  className="btn btn-primary"
                >
                  Xem bảng chấm công
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    // </div>
  );
}
