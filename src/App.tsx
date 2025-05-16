import { useEffect, useRef } from "react";
import "./App.css";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import rawShips from "./data/npcData";
import { useShips, type Ship } from "./hooks/useShips";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ShipDashboard from "./components/ShipDashboard";
import UpgradeDrawer from "./components/UpgradeDrawer";
import { toaster, Toaster } from "./components/ui/toaster";

function App() {
    const shipManager = useShips();
    const { ships, addShip } = shipManager;
    const npcShips = rawShips as Ship[];

    // Import the ships from data
    const devInitialized = useRef(false);
    useEffect(() => {
        // Prevent useEffect from running twice while in dev mode.
        if (devInitialized.current) return;
        devInitialized.current = true;

        npcShips.map((ship) => {
            addShip(ship);
        });
    }, []);

    return (
        <>
            <Toaster />
            <Grid
                templateAreas={{
                    base: `"navigation" "main" "footer"`,
                }}
                templateColumns={{
                    base: "1fr",
                }}
            >
                <GridItem area="navigation" padding={2}>
                    <NavBar />
                    <UpgradeDrawer shipManager={shipManager} />
                </GridItem>
                <GridItem area="main" padding={2}>
                    <Box>
                        {ships.map((ship) => (
                            <ShipDashboard key={ship.id} ship={ship} shipManager={shipManager} />
                        ))}
                    </Box>
                </GridItem>
                <GridItem area="footer" padding={2}>
                    <Box>
                        <Footer />
                    </Box>
                </GridItem>
            </Grid>
        </>
    );
}

export default App;
