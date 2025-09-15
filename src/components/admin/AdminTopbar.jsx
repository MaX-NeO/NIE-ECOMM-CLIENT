import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Pencil, Power } from 'lucide-react'
import { useNavigate } from "react-router-dom";
const AdminTopbar = () => {
    const navigate = useNavigate()
    const handleLogout = () => {
        navigate('/')
    }
    return (
        <Navbar bg="light" expand="lg" className="shadow-sm">
            <Container fluid>
                <Nav className="ms-auto">
                    <Button variant="outline-danger" size="sm" onClick={handleLogout}>
                        <Power />
                    </Button>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default AdminTopbar;
