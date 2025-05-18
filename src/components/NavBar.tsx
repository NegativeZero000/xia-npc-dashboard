import { Image, HStack, Heading } from "@chakra-ui/react";
import logo from "../assets/dp.png";
import type { UseShips } from "../hooks/useShips";
import UpgradeDrawer from "./UpgradeDrawer";
import { AlertDialog } from "./AlertDialog";
import ColorModeSwitch from "./ColorModeSwitch";

interface Props {
    shipManager: UseShips;
}

const NavBar = ({ shipManager }: Props) => {
    const {resetAllShips} = shipManager
    return (
        <HStack justifyContent="space-between" padding="10px">
            <Image className="logo" src={logo} boxSize="40px" />
            <Heading>Xia NPC Dashboard</Heading>
            <HStack>
                <UpgradeDrawer shipManager={shipManager} />
                <AlertDialog
                    commitTitle="Factory Reset all ships"
                    commitBody="After review the Space Hanes manuals you have decided that all of the ships looked better as stock. Commiting this will reset all ships to their intial configuration removing all/any changes currently visible in the dashboard"
                    commitButtonName="Reset All"
                    onCommit={resetAllShips}
                >
                    Reset All Ships
                </AlertDialog>
                <ColorModeSwitch />
            </HStack>
        </HStack>
    );
};

export default NavBar;
