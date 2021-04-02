import React from "react";

// Import bootstrap components
import { Nav, Button, Navbar, Container, Dropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

// Import FontAwesomeIcons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const NavbarComp = () => {
  return (
    <>
      <Navbar bg="white" variant="light">
        <Container className="NavbarContainer">
          <LinkContainer to="/">
            <Navbar.Brand className="NavbarLogo">
              <h1>Kite</h1>
            </Navbar.Brand>
          </LinkContainer>

          <Nav className="ml-auto mr-5 NavbarMenu">
            <Button className="NavbarButton">ADD A SPOT</Button>
            <Dropdown>
              <Dropdown.Toggle variant="0" className="NavbarDropdownToggle">
                <FontAwesomeIcon icon={faUserCircle} className="NavbarIcon" />
              </Dropdown.Toggle>

              <Dropdown.Menu alignRight>
                <Dropdown.Item className="LogoutSection">
                  <FontAwesomeIcon
                    icon={faSignOutAlt}
                    className="iconLogoutSection"
                  />
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarComp;
