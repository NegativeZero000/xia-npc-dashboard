import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import "./App.css";
import NavBar from "./components/NavBar";

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
                <Box backgroundColor="gray.400">
                    <Text>Footer</Text>
                </Box>
            </GridItem>
        </Grid>
    );
}

export default App;
