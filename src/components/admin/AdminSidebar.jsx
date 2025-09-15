import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div
      className="d-flex flex-column text-dark p-3 shadow-lg"
      style={{ width: "220px", minHeight: "100vh" }}
    >
      <h4 className="text-center mb-4">MyApp</h4>
      <Nav className="flex-column">
        <Nav.Link as={NavLink} to="/admin/products" className="shadow-lg w-100">
          Products
        </Nav.Link>
        <Nav.Link as={NavLink} to="/admin/users"  className="shadow-lg">
          Users
        </Nav.Link>
        <Nav.Link as={NavLink} to="/admin/orders"  className="shadow-lg">
          Orders
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default AdminSidebar;
