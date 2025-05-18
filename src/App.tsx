import { useEffect, useRef } from "react";
import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import "./App.css";
import rawShips from "./data/npcData";
import { useShips, type Ship } from "./hooks/useShips";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { Toaster } from "./components/ui/toaster";
import ShipDisplay from "./components/ShipDisplay";

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
                    <NavBar shipManager={shipManager} />
                </GridItem>
                <GridItem area="main" padding={2}>
                    <Box>
                        {ships.map((ship) => (
                            <ShipDisplay key={ship.id} ship={ship} shipManager={shipManager} />
                        ))}
                    </Box>
                </GridItem>
                <GridItem area="footer" padding={2}>
                    <Box>
                        <Footer />
                        <Text>
                            Counter
                            <Text as="sup" fontSize="xs" color="red.500" ml={1}>
                                3
                            </Text>
                        </Text>
                    </Box>
                </GridItem>
            </Grid>
        </>
    );
}

export default App;
