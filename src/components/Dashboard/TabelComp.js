import React, { useEffect, useState } from "react";

// Import Bootstrap Components
import { Container, Table, Row, Col } from "react-bootstrap";

// Import Redux Tools
import { useDispatch, useSelector } from "react-redux";

// Import files, functions or constants
import { GetSpots } from "../../Actions/getSpotsAction";
import SearchBar from "./SearchBar";

const TabelComp = () => {
  // Hooks
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  let spots = useSelector((state) => state.spots.data);

  // Functions
  const filterSpots = (spots, query) => {
    if (query === "") {
      return spots;
    }

    return spots.filter((spot) => {
      return (
        spot.name.toLowerCase().includes(query.toLowerCase()) ||
        spot.country.toLowerCase().includes(query.toLowerCase()) ||
        spot.lat.toString().toLowerCase().includes(query.toLowerCase()) ||
        spot.long.toString().toLowerCase().includes(query.toLowerCase()) ||
        spot.month.toLowerCase().includes(query.toLowerCase()) ||
        spot.probability.toString().toLowerCase().includes(query.toLowerCase())
      );
    });
  };

  const filteredSpots = filterSpots(spots, keyword);

  // UseEffect
  useEffect(() => {
    dispatch(GetSpots());
  }, [dispatch]);

  return (
    <Container className="TableContainer">
      <Row>
        <Col>
          <h1>Locations</h1>
        </Col>
      </Row>
      <Row className="searchBar">
        <Col>
          <SearchBar setKeyword={setKeyword} keyword={keyword} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Country</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Wind Prob.</th>
                <th>When to go</th>
              </tr>
            </thead>
            <tbody>
              {filteredSpots &&
                filteredSpots.map((spot) => {
                  return (
                    <tr key={spot.id}>
                      <td>{spot.name}</td>
                      <td>{spot.country}</td>
                      <td>{spot.lat}</td>
                      <td>{spot.long}</td>
                      <td>{spot.probability}%</td>
                      <td>{spot.month}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default TabelComp;
