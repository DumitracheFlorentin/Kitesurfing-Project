import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// Import Bootstrap Components
import {
  Nav,
  Button,
  Navbar,
  Container,
  Dropdown,
  Modal,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

// Import files, functions or constants
import AddLocation from "./AddLocation";

// Import FontAwesomeIcons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const NavbarComp = () => {
  // Hooks
  let history = useHistory();
  const [modalShow, setModalShow] = useState(false);

  // Functions
  const logoutHandler = () => {
    localStorage.removeItem("userID");
    history.push("/login");
  };

  return (
    <>
      <Navbar bg="white" variant="light">
        <Container className="NavbarContainer">
          <LinkContainer to="/">
            <Navbar.Brand>
              <h1 className="logo">Kite</h1>
            </Navbar.Brand>
          </LinkContainer>

          <Nav className="NavbarMenu">
            {!modalShow && (
              <Button
                className="NavbarButton"
                onClick={() => {
                  setModalShow(true);
                }}
              >
                ADD A SPOT
              </Button>
            )}
            <Dropdown>
              <Dropdown.Toggle variant="0" className="NavbarDropdownToggle">
                <FontAwesomeIcon icon={faUserCircle} className="NavbarIcon" />
              </Dropdown.Toggle>

              <Dropdown.Menu alignRight>
                <Dropdown.Item
                  className="LogoutSection"
                  onClick={logoutHandler}
                >
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
      <Modal
        size="md"
        show={modalShow}
        onHide={() => setModalShow(false)}
        aria-labelledby="modalNewLocation"
      >
        <Modal.Body>
          <AddLocation setModalShow={setModalShow} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NavbarComp;
