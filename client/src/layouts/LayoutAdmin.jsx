import React from "react";
import { Outlet } from "react-router-dom";

const LayoutAdmin = () => {
  return (
    <>
      <h1>MainAmin</h1>
      <hr />
      <Outlet />
    </>
  );
};

export default LayoutAdmin;