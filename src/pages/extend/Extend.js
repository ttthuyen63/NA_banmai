import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Search from "../../components/search/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import styles from "../../css/Extend.module.css";
import { useNavigate } from "react-router-dom";

export default function Extend() {
  const navigate = useNavigate();
  const gotoKitchenManage = () => {
    navigate("/kitchenManager");
  };
  const gotoExportExcel = () => {
    navigate("/exportExcel");
  };
  return (
    <div className="row">
      <div className="col-sm-2">
        <Sidebar />
      </div>

      <div className="col-sm-10">
        <div className="content">
          <div className="detail-header">
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
