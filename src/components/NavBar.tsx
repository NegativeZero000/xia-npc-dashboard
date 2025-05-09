import { Box, Text, Image, HStack } from "@chakra-ui/react";
import logo from "../assets/dp.png";

const NavBar = () => {
    return (
        <HStack justifyContent="space-between" padding="10px">
            <Image className="logo" src={logo} boxSize="40px" />
        </HStack>
    );
};

export default NavBar;
