import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import { AppShell } from "@mantine/core";
import NavBar from "./components/NavBar";
import AppRouter from "./routes/AppRouter";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AppShell header={{ height: 60 }} padding="md">
                    <AppShell.Header>
                        <NavBar />
                    </AppShell.Header>

                    <AppShell.Main>
                        <AppRouter />
                    </AppShell.Main>
                </AppShell>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
