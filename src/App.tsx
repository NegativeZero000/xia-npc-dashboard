import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import "./App.css";

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
                <Box backgroundColor="green.400">
                    <Text>Navigation</Text>
                </Box>
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
