import React from "react";

const Format = (props) => {
  const { boolean } = props;
  const { approveStatus } = props;

  if (boolean === true) {
    return <td>Có</td>;
  } else if (boolean === false) {
    return <td>Không</td>;
  }

  if (approveStatus === "APPROVE") {
    return <div className="timesheet-approve">Đã duyệt</div>;
  } else if (approveStatus === "DENY") {
    return <div className="timesheet-deny">Bị từ chối</div>;
  } else if (approveStatus === "PENDING") {
    return <div className="timesheet-pending">Chờ duyệt</div>;
  }
};
export default Format;
