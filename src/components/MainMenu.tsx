import { CgMenuGridO } from "react-icons/cg";
import { Button, Menu, Portal } from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";
import { AlertDialog } from "./AlertDialog";
import type { UseShips } from "../hooks/useShips";

interface Props {
    shipManager: UseShips
}

const PlatformSelector = ({shipManager}: Props) => {
    const {resetShip} = shipManager
    return (
        <Menu.Root>
            <Menu.Trigger asChild>
                <Button variant="outline" size="sm">
                    Menu
                    <CgMenuGridO />
                </Button>
            </Menu.Trigger>
            <Portal>
                <Menu.Positioner>
                    <Menu.Content>
                        <Menu.Item value="rename">Test 1</Menu.Item>
                        <Menu.Item value="export"><ColorModeSwitch/></Menu.Item>
                        <Menu.Item value="reset" color="fg.error" _hover={{ bg: "bg.error", color: "fg.error" }}>
                            AlertDialog
                        </Menu.Item>
                    </Menu.Content>
                </Menu.Positioner>
            </Portal>
        </Menu.Root>
    );
};

export default PlatformSelector;
