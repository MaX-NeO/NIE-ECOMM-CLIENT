// Layout.jsx
import React from "react";

import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminTopbar from "../../components/admin/AdminTopbar";

const AdminLayout = () => {
  return (
    <div className="d-flex">
      <AdminSidebar />

      <div className="flex-grow-1">
        <AdminTopbar />
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
