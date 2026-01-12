import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { MantineProvider } from "@mantine/core";
import "./index.css";
import App from "./App.tsx";
import { Notifications } from "@mantine/notifications";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <MantineProvider>
            <Notifications position="top-right" />
            <App />
        </MantineProvider>
    </StrictMode>,
);

export default App;
