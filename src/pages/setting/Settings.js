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
                    <div></div>
                </div>
                <div className="col-sm-4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
