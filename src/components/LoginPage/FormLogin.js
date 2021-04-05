import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";

// Import Redux Tools
import { useDispatch } from "react-redux";

// Import Bootstrap Components
import { Form, Button } from "react-bootstrap";

// Import files, functions or constants
import { POST_LOGIN_API } from "../../API/Functions";
import { specificAccount } from "../../Actions/specificAccountAction";

const FormLogin = ({ setAlert }) => {
  // Hooks
  let history = useHistory();
  const dispatch = useDispatch();
  const UsernameRef = useRef();
  const PasswordRef = useRef();

  // Functions
  const loginAccountHandler = (e) => {
    e.preventDefault();

    if (!UsernameRef.current.value || !PasswordRef.current.value) {
      setAlert(true);
    } else {
      // Get userID from login form
      Axios.post(POST_LOGIN_API(), {
        username: UsernameRef.current.value,
        password: PasswordRef.current.value,
      })
        .then((res) => {
          localStorage.setItem("userID", res.data.userId);
          dispatch(specificAccount(res.data.userId));
          history.push("/");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
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
        <Form.Group className="submitLoginBtn">
          <Button
            type="submit"
            className="loginButton"
            onClick={loginAccountHandler}
          >
            Login
          </Button>
        </Form.Group>
      </Form>
    </>
  );
};

export default FormLogin;
