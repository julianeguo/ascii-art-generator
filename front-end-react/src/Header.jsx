import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap'

// PascalCasing for React
// ul = unordered list
export default function Header() {
    return (
        <div>
            <header>
                <Navbar expand="lg" bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="#home" className="mx-auto">ASCII</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="#home">About</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        </div>
    );
}