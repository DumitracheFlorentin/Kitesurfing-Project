import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

// Import Bootstrap Components
import { Container, Table, Row, Col } from "react-bootstrap";

// Import Redux Tools
import { useDispatch, useSelector } from "react-redux";

//Import FontAwesomeIcons
import { faSort } from "@fortawesome/free-solid-svg-icons";

// Import files, functions or constants
import { GetSpots } from "../../Actions/getSpotsAction";
import SearchBar from "./SearchBar";

const TabelComp = () => {
  // Hooks
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const [action, setAction] = useState("");
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

  const sortedTable = (spots, name) => {
    switch (name) {
      case "name_asc":
        if (spots) {
          return spots.sort((a, b) => a.name.localeCompare(b.name));
        }
      case "name_dsc":
        if (spots) {
          return spots.sort((a, b) => b.name.localeCompare(a.name));
        }
      default:
        return spots;
    }
  };

  const setActionHandler = () => {
    if (action === "") {
      setAction("name_asc");
    } else if (action === "name_asc") {
      setAction("name_dsc");
    } else if (action === "name_dsc") {
      setAction("name_asc");
    }
  };

  sortedTable(spots, action);

  const filteredSpots = filterSpots(spots, keyword);

  // UseEffect
  useEffect(() => {
    dispatch(GetSpots());
  }, [dispatch]);

  useEffect(() => {
    switch (action) {
      case "name_asc":
        return sortedTable(spots, "name_asc");
      case "name_dsc":
        sortedTable(spots, "name_dsc");
      default:
        return spots;
    }
  }, [action]);

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
        <Col className="tableResponsive">
          <Table striped bordered hover responsive>
            <thead className="TheadTable">
              <tr>
                <th>
                  <Row className="RowTable">
                    <Col className="ThName">
                      <p>Name</p>
                    </Col>
                    <Col className="ThButton" onClick={setActionHandler}>
                      <FontAwesomeIcon icon={faSort} />
                    </Col>
                  </Row>
                </th>
                <th>
                  <Row className="RowTable">
                    <Col className="ThName">
                      <p>Country</p>
                    </Col>
                    <Col className="ThButton">
                      <FontAwesomeIcon icon={faSort} />
                    </Col>
                  </Row>
                </th>
                <th>
                  <Row className="RowTable">
                    <Col className="ThName">
                      <p>Latitude</p>
                    </Col>
                    <Col className="ThButton">
                      <FontAwesomeIcon icon={faSort} />
                    </Col>
                  </Row>
                </th>
                <th>
                  <Row className="RowTable">
                    <Col className="ThName">
                      <p>Longitude</p>
                    </Col>
                    <Col className="ThButton">
                      <FontAwesomeIcon icon={faSort} />
                    </Col>
                  </Row>
                </th>
                <th>
                  <Row className="RowTable space">
                    <Col className="ThName">
                      <p>Wind Prob.</p>
                    </Col>
                    <Col className="ThButton">
                      <FontAwesomeIcon icon={faSort} />
                    </Col>
                  </Row>
                </th>
                <th>
                  <Row className="RowTable space">
                    <Col className="ThName spaceTh">
                      <p>Where to go</p>
                    </Col>
                    <Col className="ThButton">
                      <FontAwesomeIcon icon={faSort} />
                    </Col>
                  </Row>
                </th>
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
