import React from "react";

const Options = (props) => {
  const { part } = props;
  const { position } = props;
  const { typeAccount } = props;

  if (part === "KITCHEN") {
    return <div>Bếp</div>;
  } else if (part === "MANAGEMENT") {
    return <div>Quản lý</div>;
  } else if (part === "HR") {
    return <div>Hành chính</div>;
  }

  if (position === "PERSONNEL") {
    return <div>Nhân viên</div>;
  } else if (position === "MANAGER") {
    return <div>Quản lý</div>;
  }

  if (typeAccount === "PERSONNEL") {
    return <div>Nhân viên</div>;
  } else if (typeAccount === "ADMIN") {
    return <div>Quản trị</div>;
  }
};
export default Options;
