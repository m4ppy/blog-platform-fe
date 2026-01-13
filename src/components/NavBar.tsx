import { Group, Title, Button, Container, Anchor } from "@mantine/core";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
    const { isAuthenticated, logout } = useAuth();

    return (
        <Container size="lg" h="100%" bg="transparent">
            <Group justify="space-between" h="100%">
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
                        <Anchor component={Link} to="/">
                            Home
                        </Anchor>
                        <Anchor component={Link} to="/categories">
                            Categories
                        </Anchor>
                        <Anchor component={Link} to="/tags">
                            Tags
                        </Anchor>
                        {isAuthenticated && (
                            <Anchor component={Link} to="/drafts">
                                Drafts
                            </Anchor>
                        )}
                    </>
                </Group>

                {/* Right side */}
                <Group>
                    {!isAuthenticated ? (
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
                        <Button color="red" onClick={logout}>
                            Logout
                        </Button>
                    )}
                </Group>
            </Group>
        </Container>
    );
}
