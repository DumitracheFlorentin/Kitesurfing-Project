import { useHistory } from "react-router-dom";

// Import files, functions or components
import ErrorSVG from "../Assets/404.jpg";

// Import Bootstrap Components
import { Button } from "react-bootstrap";

const Error404 = () => {
  // Hooks
  let history = useHistory();

  return (
    <div className="errorContainer">
      <div className="ErrorImage">
        <img src={ErrorSVG} alt="Error404" />
      </div>
      <div className="ErrorText">
        <Button
          className="ErrorBtn"
          onClick={() => {
            history.push("/");
          }}
        >
          Go To Homapage
        </Button>
      </div>
    </div>
  );
};

export default Error404;
