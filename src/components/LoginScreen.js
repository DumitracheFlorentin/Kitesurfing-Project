import React, { useRef, useState, useEffect } from "react";
import Axios from "axios";

// Import bootstrap components
import { Form, Button, Alert } from "react-bootstrap";

// Import files, functions or constants
import { POST_LOGIN_API } from "../API/Functions";

const LoginScreen = () => {
  // Hooks
  const UsernameRef = useRef();
  const PasswordRef = useRef();
  const [alert, setAlert] = useState(false);

  // Functions
  const loginAccountHandler = (e) => {
    // Prevent refreshing the page
    e.preventDefault();

    if (!UsernameRef.current.value || !PasswordRef.current.value) {
      setAlert(true);
    } else {
      // Get userID from login form
      Axios.post(POST_LOGIN_API(), {
        username: UsernameRef.current.value,
        password: PasswordRef.current.value,
      })
        .then(
          (res) => res.data && localStorage.setItem("userID", res.data.userId)
        )
        .catch((err) => console.log(err));
    }
  };

  // UseEffect
  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [alert]);

  return (
    <div className="loginScreen">
      <h1>Kite</h1>
      {alert && (
        <Alert variant="warning">Please complete all the fields!</Alert>
      )}
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
