import { useState } from "react";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ShipDashboard from "./components/ShipDashboard";
import npcShip from "./data/npcData"
import type { Ship } from "./hooks/useShip";
import UpgradeDrawer from "./components/UpgradeDrawer"


function App() {
    const [enforcer, setEnforcer] = useState(npcShip.find(key => key.name === "Enforcer" ) as Ship)
    const [merchant, setMerchant] = useState(npcShip.find(key => key.name === "Merchant" ) as Ship)
    const [scoundrel, setScoundrel] = useState(npcShip.find(key => key.name === "Scoundrel" ) as Ship)
    const [sellsword, setSellsword] = useState(npcShip.find(key => key.name === "Sellsword" ) as Ship)

    return (
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
                <UpgradeDrawer setEnforcerState={setEnforcer}/>
            </GridItem>
            <GridItem area="main" padding={2}>
                <Box>
                   <ShipDashboard ship={enforcer} setShip={setEnforcer}/>
                   <ShipDashboard ship={merchant} setShip={setMerchant}/>
                   <ShipDashboard ship={scoundrel} setShip={setScoundrel}/>
                   <ShipDashboard ship={sellsword} setShip={setSellsword}/>
                </Box>
            </GridItem>
            <GridItem area="footer" padding={2}>
                <Box>
                    <Footer />
                </Box>
            </GridItem>
        </Grid>
    );
}

export default App;