import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectRouter(props) {
  const navigate = useNavigate();
  const token = useSelector((state) => state.userReducer.token);
  const tokenExpiration = useSelector(
    (state) => state.userReducer.tokenExpiration
  );

  useEffect(() => {
    if (tokenExpiration && new Date(tokenExpiration) < new Date()) {
      navigate("/login");
    }
  }, [tokenExpiration, navigate]);
  return token !== null ? (
    props.children
  ) : (
    <Navigate to={"/login"} replace={true} />
  );
}
