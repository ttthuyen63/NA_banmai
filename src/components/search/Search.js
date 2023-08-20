import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faSearch,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import "./search.css";
import { useNavigate } from "react-router-dom";

// import styles from "../css/Search.module.css";

export default function Search() {
  const navigate = useNavigate();
  const gotoCreateStaff = () => {
    navigate("/createStaff");
  };
  return (
    <div className="search">
      <div
        className="btnSelect"
        // onClick={onBackClick}
      >
        <select
          className="btnSelect"
          // value={selectedOption} onChange={handleSelectChange}
        >
          <option value="">Chọn tùy chọn</option>
          <option value="option1">Tùy chọn 1</option>
          <option value="option2">Tùy chọn 2</option>
          <option value="option3">Tùy chọn 3</option>
        </select>
      </div>
      <div className="searchContainer">
        <i>
          <FontAwesomeIcon icon={faSearch} className="searchIcon" />
        </i>
        <input className="inputSearch" type="text" placeholder="Tìm kiếm..." />
      </div>

      <div
        className="btnCreate"
        onClick={() => {
          gotoCreateStaff();
        }}
      >
        Thêm
        {/* <FontAwesomeIcon icon={faPlus} /> */}
      </div>
    </div>
  );
}
