import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import Axios from "axios";

// Import Bootstrap Components
import { Form, Button } from "react-bootstrap";

// Import files, functions or constans
import { API_REQ } from "../../API/Functions";
import { USER } from "../../Constants/API";

const SignupForm = ({ setWarning }) => {
  // Hooks
  let history = useHistory();
  const nameRef = useRef();
  const emailRef = useRef();
  const linkRef = useRef();

  // Functions
  const signupHandler = (e) => {
    e.preventDefault();

    if (
      !nameRef.current.value ||
      !emailRef.current.value ||
      !linkRef.current.value ||
      !emailRef.current.value.includes("@")
    ) {
      setWarning(true);
    } else {
      const date = new moment().format();

      Axios.post(API_REQ(USER), {
        id: uuidv4(),
        createdAt: date,
        name: nameRef.current.value,
        avatar: linkRef.current.value,
        email: emailRef.current.value,
      })
        .then(() => {
          history.push("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <Form className="signupForm">
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter name..." ref={nameRef} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email..."
            ref={emailRef}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Avatar Link</Form.Label>
          <Form.Control type="text" placeholder="Link..." ref={linkRef} />
        </Form.Group>
        <Form.Group className="submitSignupBtn">
          <Button
            type="submit"
            className="signupButton"
            onClick={signupHandler}
          >
            Sign Up
          </Button>
        </Form.Group>
      </Form>
    </>
  );
};

export default SignupForm;
