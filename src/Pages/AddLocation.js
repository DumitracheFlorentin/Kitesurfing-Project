import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

// Import files, functions or constants
import NavbarComp from "../Components/NavbarComp";

// Import Bootstrap components
import { Container, Form, Col, Button } from "react-bootstrap";
import { API_REQ } from "../API/Functions";
import { SPOT } from "../Constants/API";

const AddLocation = () => {
  // Hooks
  const nameRef = useRef();
  const countryRef = useRef();
  const latRef = useRef();
  const longRef = useRef();
  const probabilityRef = useRef();
  const monthRef = useRef();
  let history = useHistory();

  // Functions
  const createNewLocationHandler = (e) => {
    e.preventDefault();
    const date = new moment().format();

    Axios.post(API_REQ(SPOT), {
      id: uuidv4(),
      createdAt: date,
      name: nameRef.current.value,
      country: countryRef.current.value,
      lat: latRef.current.value,
      long: longRef.current.value,
      probability: probabilityRef.current.value,
      month: monthRef.current.value,
    })
      .then(() => {
        console.log("success!");
      })
      .catch((err) => {
        console.log(err);
      });

    history.push("/");
  };

  return (
    <>
      <NavbarComp />
      <Container>
        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name..."
                ref={nameRef}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCountry">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter country..."
                ref={countryRef}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridLatitude">
              <Form.Label>Latitude</Form.Label>
              <Form.Control
                type="number"
                placeholder="Latitude..."
                ref={latRef}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridLongitude">
              <Form.Label>Longitude</Form.Label>
              <Form.Control
                type="number"
                placeholder="Longitude..."
                ref={longRef}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridWindProb">
              <Form.Label>Wind Probability</Form.Label>
              <Form.Control
                type="number"
                placeholder="Wind Probability..."
                ref={probabilityRef}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridMonth">
              <Form.Label>Where To Go</Form.Label>
              <Form.Control type="text" placeholder="Month..." ref={monthRef} />
            </Form.Group>
          </Form.Row>

          <Button
            variant="primary"
            type="submit"
            onClick={createNewLocationHandler}
          >
            Create new location
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default AddLocation;
