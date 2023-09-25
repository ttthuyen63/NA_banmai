import React from "react";
import { useParams } from "react-router-dom";

export default function TimesheetDetail() {
  const params = useParams();
  const personnelCode = params.personnelCode;
  return <div>TimesheetDetail</div>;
}
