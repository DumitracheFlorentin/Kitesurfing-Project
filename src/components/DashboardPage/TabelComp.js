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

  const sortedTable = (spots, type) => {
    if (type.includes("name") || type.includes("country")) {
      switch (type.split("_")[0]) {
        case "name":
          if (spots && type.split("_")[1] === "asc") {
            return spots.sort((a, b) => a.name.localeCompare(b.name));
          } else if (spots && type.split("_")[1] === "dsc") {
            return spots.sort((a, b) => b.name.localeCompare(a.name));
          }
        case "country":
          if (spots && type.split("_")[1] === "asc") {
            return spots.sort((a, b) => a.country.localeCompare(b.country));
          } else if (spots && type.split("_")[1] === "dsc") {
            return spots.sort((a, b) => b.country.localeCompare(a.country));
          }

        default:
          return spots;
      }
    } else if (type.includes("month")) {
      var months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      if (spots && type.split("_")[1] === "asc") {
        spots.sort((a, b) => {
          return months.indexOf(a.month) - months.indexOf(b.month);
        });
      } else if (spots && type.split("_")[1] === "dsc") {
        spots.sort((a, b) => {
          return months.indexOf(b.month) - months.indexOf(a.month);
        });
      }
    } else {
      switch (type.split("_")[0]) {
        case "latitude":
          if (spots && type.split("_")[1] === "asc") {
            return spots.sort((a, b) => a.lat - b.lat);
          } else if (spots && type.split("_")[1] === "dsc") {
            return spots.sort((a, b) => b.lat - a.lat);
          }
        case "longitude":
          if (spots && type.split("_")[1] === "asc") {
            console.log("check");
            return spots.sort((a, b) => a.long - b.long);
          } else if (spots && type.split("_")[1] === "dsc") {
            return spots.sort((a, b) => b.long - a.long);
          }
        case "wind":
          if (spots && type.split("_")[1] === "asc") {
            return spots.sort((a, b) => a.probability - b.probability);
          } else if (spots && type.split("_")[1] === "dsc") {
            return spots.sort((a, b) => b.probability - a.probability);
          }
        default:
          return spots;
      }
    }
  };

  const setActionHandler = (type) => {
    if (action === "") {
      setAction(type + "_asc");
    } else if (action === type + "_asc") {
      setAction(type + "_dsc");
    } else if (action === type + "_dsc") {
      setAction(type + "_asc");
    } else {
      setAction(type + "_asc");
    }
  };

  sortedTable(spots, action);

  const filteredSpots = filterSpots(spots, keyword);

  // UseEffect
  useEffect(() => {
    dispatch(GetSpots());
  }, [dispatch]);

  useEffect(() => {
    sortedTable(spots, action);
    console.log(action);
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
                    <Col
                      className="ThButton"
                      onClick={() => setActionHandler("name")}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </Col>
                  </Row>
                </th>
                <th>
                  <Row className="RowTable">
                    <Col className="ThName">
                      <p>Country</p>
                    </Col>
                    <Col
                      className="ThButton"
                      onClick={() => setActionHandler("country")}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </Col>
                  </Row>
                </th>
                <th>
                  <Row className="RowTable">
                    <Col className="ThName">
                      <p>Latitude</p>
                    </Col>
                    <Col
                      className="ThButton"
                      onClick={() => setActionHandler("latitude")}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </Col>
                  </Row>
                </th>
                <th>
                  <Row className="RowTable">
                    <Col className="ThName">
                      <p>Longitude</p>
                    </Col>
                    <Col
                      className="ThButton"
                      onClick={() => setActionHandler("longitude")}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </Col>
                  </Row>
                </th>
                <th>
                  <Row className="RowTable space">
                    <Col className="ThName">
                      <p>Wind Prob.</p>
                    </Col>
                    <Col
                      className="ThButton"
                      onClick={() => setActionHandler("wind")}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </Col>
                  </Row>
                </th>
                <th>
                  <Row className="RowTable space">
                    <Col className="ThName spaceTh">
                      <p>Where to go</p>
                    </Col>
                    <Col
                      className="ThButton"
                      onClick={() => setActionHandler("month")}
                    >
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
