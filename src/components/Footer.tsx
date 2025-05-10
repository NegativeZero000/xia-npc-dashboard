import { Stack, Text, Heading } from "@chakra-ui/react";
import helpContent from "../data/helpContent"

const Footer = () => {
    return (
        <Stack gap={2} padding={3}>
            {helpContent.map((help) => (
                <Stack key={help.title}>
                    <Heading >{help.title}</Heading>
                    <Text>{help.text}</Text>
                </Stack>
            ))}
        </Stack>
    );
};

export default Footer;
