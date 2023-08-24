import React, { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Search from "../../components/search/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import styles from "../../css/Extend.module.css";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";

export default function Extend() {
  const navigate = useNavigate();
  const gotoKitchenManage = () => {
    navigate("/kitchenManager");
  };
  const gotoExportExcel = () => {
    navigate("/exportExcel");
  };

  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [showSidebarDialog, setShowSidebarDialog] = useState(false);

  return (
    <div className="row">
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
            <div className="title-header">Mở rộng</div>
          </div>
          <div className={styles.contentExtend}>
            <div
              className={styles.btnManageKitchen}
              onClick={() => {
                gotoKitchenManage();
              }}
            >
              <button>
                Quản lý bếp
                <i>
                  <FontAwesomeIcon icon={faChevronRight} />
                </i>
              </button>
            </div>
            <div
              className={styles.btnXuatFile}
              onClick={() => {
                gotoExportExcel();
              }}
            >
              <button>
                Xuất file Excel
                <i>
                  <FontAwesomeIcon icon={faChevronRight} />
                </i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
