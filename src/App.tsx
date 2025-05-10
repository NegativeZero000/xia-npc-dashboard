import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Ships from "./components/Ships";
import npcShip from "./data/npcData"
import type { Ship } from "./hooks/useShip";

function App() {
    const aShip = npcShip as Ship
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
            </GridItem>
            <GridItem area="main" padding={2}>
                <Box backgroundColor="gray.400">
                   <Ships ship={aShip}/>
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
