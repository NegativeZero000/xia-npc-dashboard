import { Image, HStack } from "@chakra-ui/react";
import logo from "../assets/dp.png";
import MainMenu from "./MainMenu";

const NavBar = () => {
    return (
        <HStack justifyContent="space-between" padding="10px">
            <Image className="logo" src={logo} boxSize="40px" />
            <MainMenu/>
        </HStack>
    );
};

export default NavBar;
