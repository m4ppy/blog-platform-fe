import { Group, Title, Button, Container, Anchor } from "@mantine/core";
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
                <Title order={3}>
                    <Anchor
                        component={Link}
                        to="/"
                        underline="never"
                        c="inherit"
                    >
                        Blog Platform
                    </Anchor>
                </Title>

                {/* Center: Navigation tabs */}
                <Group gap="lg">
                    <>
                        <Anchor component={Link} to="/posts">
                            Posts
                        </Anchor>
                        <Anchor component={Link} to="/tags">
                            Tags
                        </Anchor>
                        {isLoggedIn && (
                            <Anchor component={Link} to="/drafts">
                                Drafts
                            </Anchor>
                        )}
                    </>
                </Group>

                {/* Right side */}
                <Group>
                    {!isLoggedIn ? (
                        <>
                            <Button
                                component={Link}
                                to="/login"
                                variant="default"
                            >
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
