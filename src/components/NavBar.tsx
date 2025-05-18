import { Image, HStack, Heading } from "@chakra-ui/react";
import logo from "../assets/dp.png";
import MainMenu from "./MainMenu";
import type { UseShips } from "../hooks/useShips";
import UpgradeDrawer from "./UpgradeDrawer";

interface Props {
    shipManager: UseShips;
}

const NavBar = ({ shipManager }: Props) => {
    return (
        <HStack justifyContent="space-between" padding="10px">
            <Image className="logo" src={logo} boxSize="40px" />
            <Heading>Xia NPC Dashboard</Heading>
            <HStack>
                <UpgradeDrawer shipManager={shipManager} />
                <MainMenu shipManager={shipManager}/>
            </HStack>
        </HStack>
    );
};

export default NavBar;
