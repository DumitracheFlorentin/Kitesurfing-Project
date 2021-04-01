import React, { useRef } from "react";

// Import bootstrap
import { Form, Button } from "react-bootstrap";

const LoginScreen = () => {
  // Variables
  const UsernameRef = useRef();
  const PasswordRef = useRef();

  // Functions
  const loginAccountHandler = (e) => {
    // Prevent refreshing the page
    e.preventDefault();

    // Get userID from login form
  };

  return (
    <div className="loginScreen">
      <h1>Kite</h1>
      <Form className="loginForm">
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username..."
            ref={UsernameRef}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password..."
            ref={PasswordRef}
          />
        </Form.Group>
        <Form.Group className="spaceLoginBtn">
          <Button
            type="submit"
            className="loginBtn"
            onClick={loginAccountHandler}
          >
            Login
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default LoginScreen;
