import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

function App() {
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
                <Box backgroundColor="blue.400">
                    <Text>Main</Text>
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
