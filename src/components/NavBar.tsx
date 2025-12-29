import { Group, Title, Button, Container } from "@mantine/core";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

export default function Navbar() {
  const authContext = useContext(AuthContext);

  const isLoggedIn = !!authContext?.auth.accessToken;

  return (
    <Container size="lg" h="100%">
      <Group justify="space-between" h="100%" bg="gray">
        {/* Logo / Title */}
        <Title order={3}>Blog Platform</Title>

        {/* Right side */}
        <Group>
          {!isLoggedIn ? (
            <>
              <Button component={Link} to="/login" variant="default">
                Login
              </Button>
              <Button component={Link} to="/register">
                Register
              </Button>
            </>
          ) : (
            <Button color="red" onClick={authContext?.logout}>
              Logout
            </Button>
          )}
        </Group>
      </Group>
    </Container>
  );
}
