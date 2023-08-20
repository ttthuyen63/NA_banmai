import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../css/KitchenStaffInfo.module.css";
import KitchenStaffInfo from "../../components/KitchenStaffInfo";

export default function KitchenStaffDetail() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    // navigate("/kitchenDetail");
    navigate(-1);
  };
  const goToDetail = () => {
    navigate("/staffDetail");
  };
  return (
    <div>
      <div className="header-kitchen-staff">
        <div className="header_kitchen-staff_left">
          <button
            className="header_kitchen-staff_back-button"
            onClick={() => {
              handleBackClick();
            }}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        </div>
        <div className="header_kitchen-staff_center">
          Danh sách nhân viên bếp
        </div>
        <div className="header_kitchen-staff_right">
          <p className="header_kitchen-staff_kitchen-code">Mã bếp</p>
        </div>
      </div>
      <div
        className={styles.staffInfo}
        onClick={() => goToDetail(/*item?.id*/)}
      >
        <KitchenStaffInfo
          title="Thông tin người 1"
          fullName="Nguyễn Văn A"
          birthDate="01/01/1990"
        />
        <KitchenStaffInfo
          title="Thông tin người 1"
          fullName="Nguyễn Văn A"
          birthDate="01/01/1990"
        />
        <KitchenStaffInfo
          title="Thông tin người 1"
          fullName="Nguyễn Văn A"
          birthDate="01/01/1990"
        />
        <KitchenStaffInfo
          title="Thông tin người 1"
          fullName="Nguyễn Văn A"
          birthDate="01/01/1990"
        />
        <KitchenStaffInfo
          title="Thông tin người 1"
          fullName="Nguyễn Văn A"
          birthDate="01/01/1990"
        />
        <KitchenStaffInfo
          title="Thông tin người 1"
          fullName="Nguyễn Văn A"
          birthDate="01/01/1990"
        />
        <KitchenStaffInfo
          title="Thông tin người 1"
          fullName="Nguyễn Văn A"
          birthDate="01/01/1990"
        />
      </div>
    </div>
  );
}
