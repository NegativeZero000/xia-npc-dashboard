import { GiSpaceship } from "react-icons/gi";
import { useState } from "react";
import { Text, Button, CloseButton, Drawer, Portal, HStack, Table, Separator, Box } from "@chakra-ui/react";
import { DiceIcon } from "./Icons";
import type { Ship } from "../hooks/useShip";

interface Props {
    setEnforcerState: (ship: Ship) => void;
}

const UpgradeDrawer = ({ setEnforcerState }: Props) => {
    const shipsToUpgradeTable = [
        { id: 1, dieRoll: "01 - 04", npc: "All NPCs" },
        { id: 2, dieRoll: "05 - 06", npc: "Merchant" },
        { id: 3, dieRoll: "07 - 08", npc: "Enforcer" },
        { id: 4, dieRoll: "09 - 10", npc: "Scoundrel" },
        { id: 5, dieRoll: "11 - 12", npc: "Sellsword" },
    ];

    const upgradeShipActionsTable = [
        { id: 1, dieRoll: "01 - 01", effect: "Add 6 to the movement rate of the NPC." },
        { id: 2, dieRoll: "02 - 03", effect: "Add 3 to the movement rate of the NPC." },
        { id: 3, dieRoll: "04 - 05", effect: "Attack uses two dice instead of 1. (Reroll for merchant)." },
        { id: 4, dieRoll: "06 - 07", effect: "Use next higher attack dice. (Reroll for merchant)." },
        { id: 5, dieRoll: "08 - 09", effect: "Defense uses 1 more defense die." },
        { id: 6, dieRoll: "10 - 11", effect: "Use the next higher defense dice." },
        { id: 7, dieRoll: "12 - 12", effect: "Add another activation chip for this NPC to the bag." },
    ];

    const [selectedShipUpgradeRow, setSelectedShipUpgradeRow] = useState("");
    const [selectedUpgradeRow, setSelectedUpgradeRow] = useState("");
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleShipUpgradeRowClick = (index: string) => {
        setSelectedShipUpgradeRow(index);
    };
    const handleUpgradeRowClick = (index: string) => {
        setSelectedUpgradeRow(index);
    };

    const handleCloseDrawer = () => {
        setSelectedShipUpgradeRow("");
        setSelectedUpgradeRow("");
        setDrawerOpen(false);
    };

    const handleUpgrade = () => {
        console.log(selectedShipUpgradeRow);
        console.log(selectedUpgradeRow);
    };

    return (
        <Drawer.Root size="md" open={drawerOpen} onOpenChange={(event) => setDrawerOpen(event.open)}>
            <Drawer.Trigger asChild>
                <Button variant="outline" size="sm">
                    Upgrade Ship
                </Button>
            </Drawer.Trigger>
            <Portal>
                <Drawer.Backdrop />
                <Drawer.Positioner>
                    <Drawer.Content>
                        <Drawer.Header>
                            <Drawer.Title>
                                <HStack>
                                    <GiSpaceship />
                                    Ship Upgrades
                                    <GiSpaceship />
                                </HStack>
                            </Drawer.Title>
                        </Drawer.Header>
                        <Drawer.Body>
                            <Text marginBottom={4}>
                                As the game of XIA progresses into the midgame / endgame, the NPCs become less relevant
                                and less of a threat to the players. These upgrades will compensate for that.
                            </Text>
                            <Text marginBottom={4}>
                                When an upgrade is triggered, roll 1 <DiceIcon dieIndex={12} /> to identify which
                                ship(s) to upgrade. Then, select the matching option below
                            </Text>

                            <HStack>
                                <Separator flex="1" />
                                <Text flexShrink="0">Select A Ship</Text>
                                <Separator flex="1" />
                            </HStack>
                            <Box margin={5} border="2px solid" borderRadius="md">
                                <Table.Root>
                                    <Table.Header>
                                        <Table.Row backgroundColor="gray.500">
                                            <Table.ColumnHeader>Die Roll</Table.ColumnHeader>
                                            <Table.ColumnHeader>NPC Ship</Table.ColumnHeader>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {shipsToUpgradeTable.map((entry) => (
                                            <Table.Row
                                                key={entry.id}
                                                onClick={() => handleShipUpgradeRowClick(entry.npc)}
                                                backgroundColor={
                                                    entry.npc === selectedShipUpgradeRow ? "green.400" : ""
                                                }
                                            >
                                                <Table.Cell fontWeight="bold"> {entry.dieRoll}</Table.Cell>
                                                <Table.Cell>{entry.npc}</Table.Cell>
                                            </Table.Row>
                                        ))}
                                    </Table.Body>
                                </Table.Root>
                            </Box>
                            <HStack>
                                <Separator flex="1" />
                                <Text flexShrink="0">Select an Upgrade</Text>
                                <Separator flex="1" />
                            </HStack>
                            <Box margin={5} border="2px solid" borderRadius="md">
                                <Table.Root>
                                    <Table.Header>
                                        <Table.Row backgroundColor="gray.500">
                                            <Table.ColumnHeader>Die Roll</Table.ColumnHeader>
                                            <Table.ColumnHeader>Upgrade Effect</Table.ColumnHeader>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {upgradeShipActionsTable.map((entry) => (
                                            <Table.Row
                                                key={entry.id}
                                                onClick={() => handleUpgradeRowClick(entry.dieRoll)}
                                                backgroundColor={
                                                    entry.dieRoll === selectedUpgradeRow ? "green.400" : ""
                                                }
                                            >
                                                <Table.Cell fontWeight="bold"> {entry.dieRoll}</Table.Cell>
                                                <Table.Cell>{entry.effect}</Table.Cell>
                                            </Table.Row>
                                        ))}
                                    </Table.Body>
                                </Table.Root>
                            </Box>
                        </Drawer.Body>
                        <Drawer.Footer>
                            <Button variant="outline" onClick={() => handleCloseDrawer()}>
                                Cancel
                            </Button>
                            <Button
                                onClick={() => handleUpgrade()}
                                disabled={selectedUpgradeRow != "" && selectedShipUpgradeRow != "" ? false : true}
                            >
                                Upgrade
                            </Button>
                        </Drawer.Footer>
                        <Drawer.CloseTrigger asChild>
                            <CloseButton size="sm" onClick={() => handleCloseDrawer()} />
                        </Drawer.CloseTrigger>
                    </Drawer.Content>
                </Drawer.Positioner>
            </Portal>
        </Drawer.Root>
    );
};

export default UpgradeDrawer;
