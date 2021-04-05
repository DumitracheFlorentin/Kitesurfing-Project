// Import Bootstrap Components
import { Col, Row } from "react-bootstrap";

// Import FontAwesomeIcons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const PopupComp = ({ spot, colorMarker }) => {
  return (
    <>
      <div className="Container">
        <Row>
          <Col className="nameAndCountryOfSpot">
            <h3>{spot.name}</h3>
            <h5>{spot.country}</h5>
          </Col>
        </Row>
        <Row className="spotInfo">
          <Col>
            <h3>Wind probability</h3>
            <h4>{spot.probability}%</h4>
          </Col>
        </Row>
        <Row className="spotInfo">
          <Col>
            <h3>Latitude</h3>
            <h4>{spot.lat}° N</h4>
          </Col>
        </Row>
        <Row className="spotInfo">
          <Col>
            <h3>Longitude</h3>
            <h4>{spot.long}° W</h4>
          </Col>
        </Row>
        <Row className="spotInfo">
          <Col>
            <h3>When to go</h3>
            <h4>{spot.month}</h4>
          </Col>
        </Row>
      </div>
      <div className="PopoutBtn">
        {colorMarker ? (
          <button className="button redButton">
            <FontAwesomeIcon icon={faMinus} className="PopoutIcon" />
            <h1>Remove from favourites</h1>
          </button>
        ) : (
          <button className="button yellowButton">
            <FontAwesomeIcon icon={faPlus} className="PopoutIcon" />
            <h1>Add to favourites</h1>
          </button>
        )}
      </div>
    </>
  );
};

export default PopupComp;
