import Body from "../components/Body";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useUser } from "../contexts/UserProvider";
import { useFlash } from "../contexts/FlashProvider";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const usernameField = useRef();
  const passwordField = useRef();

  const { login } = useUser();
  const flash = useFlash();
  const navigate = useNavigate();

  useEffect(() => usernameField.current.focus(), []);

  const onSubmit = async (ev) => {
    ev.preventDefault();
    const username = usernameField.current.value;
    const password = passwordField.current.value;

    const result = await login(username, password);
    if (result === "fail") flash("Invalid username or password.");
    else if (result === "ok") {
      navigate("/storefront");
    }
  };

  return (
    <Body>
      <h1>Log In</h1>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>E-mail address or username</Form.Label>
          <Form.Control ref={usernameField}></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" ref={passwordField}></Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Log In
        </Button>
      </Form>
    </Body>
  );
}
