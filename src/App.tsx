
import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import npcShips from "./data/npcData";
import { useShips } from "./hooks/useShips"
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ShipDashboard from "./components/ShipDashboard";


function App() {
    // Import the ships from data
    const { ships, addShip } = useShips()
    const devInitialized = useRef(false)

    useEffect(() => {
        // Prevent useEffect from running twice while in dev mode. 
        if (devInitialized.current) return
        devInitialized.current = true

        npcShips.map((ship) => {
            addShip(ship)
        }
    )}, [])

    return (
        <>
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
                    {/* <UpgradeDrawer enforcer={enforcer} setEnforcerState={setEnforcer} merchant={merchant} setMerchantState={setMerchant} scoundrel={scoundrel} setScoundrelState={setScoundrel} sellsword={sellsword} setSellswordState={setSellsword}/> */}
                </GridItem>
                <GridItem area="main" padding={2}>
                    <Box>
                        {
                            ships.map((ship) => (
                                <ShipDashboard key={ship.id} ship={ship}></ShipDashboard>
                            ))
                        }
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
