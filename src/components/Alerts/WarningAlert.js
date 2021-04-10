// Import Bootstrap Components
import { Alert } from "react-bootstrap";

const WarningAlert = ({ type }) => {
  return (
    <>
      <Alert variant="warning">{type}</Alert>
    </>
  );
};

export default WarningAlert;
