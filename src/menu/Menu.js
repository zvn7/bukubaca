import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; // Include Bootstrap CSS

const Menu = () => {
    return (
        <Navbar bg="primary" expand="lg" variant="dark">
            <div className="container">
                <Link to="/" className="navbar-brand">
                    Buku Baca
                </Link>
                <Navbar.Toggle aria-controls="navbarNav" />
                <Navbar.Collapse id="navbarNav" className="justify-content-end">
                    <Nav>
                        <Nav.Link as={Link} to="/">
                            Home
                        </Nav.Link>
                        {/* <Nav.Link as={Link} to="/buku">
                            Buku
                        </Nav.Link>
                        <Nav.Link as={Link} to="/histori">
                            Histori Peminjaman
                        </Nav.Link>
                        <Nav.Link as={Link} to="/users">
                            User
                        </Nav.Link> */}
                        <NavDropdown title="Public" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/buku-view">
                                Buku View
                            </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Anggota" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/buku-view">
                                Buku View
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/histori">
                                Histori Peminjaman
                            </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Petugas" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/buku">
                                Buku
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/histori">
                                Histori Peminjaman
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/users">
                                User
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
};

export default Menu;
