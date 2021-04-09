// Import Bootstrap Components
import { Alert } from "react-bootstrap";

const WarningAlert = ({ type }) => {
  let returnedString;

  return (
    <>
      <Alert variant="warning">{type}</Alert>
    </>
  );
};

export default WarningAlert;
