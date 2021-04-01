// Import bootstrap
import { Form, Button } from "react-bootstrap";

const LoginScreen = () => {
  return (
    <div className="loginScreen">
      <h1>Kite</h1>
      <Form className="loginForm">
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username..." />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter password..." />
        </Form.Group>
        <div className="spaceLoginBtn">
          <Button className="loginBtn">Login</Button>
        </div>
      </Form>
    </div>
  );
};

export default LoginScreen;
