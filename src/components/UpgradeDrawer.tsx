import { GiSpaceship } from "react-icons/gi";
import { useState } from "react";
import { Text, Button, CloseButton, Drawer, Portal, HStack, Table, Separator, Box } from "@chakra-ui/react";
import { DiceIcon } from "./Icons";
import { toaster } from "./ui/toaster";
import type { UseShips } from "../hooks/useShips";

interface Props {
    shipManager: UseShips;
}

const UpgradeDrawer = ({ shipManager }: Props) => {
    const {
        ships,
        adjustShipMovementRate,
        increaseShipAttackDie,
        increaseShipDefenceDie,
        increaseShipNumberOfAttackDice,
        increaseShipNumberOfDefenceDice,
        increaseShipNumberOfActivationChips,
    } = shipManager;
    const shipsToUpgrade: { id: number; dieRollStart: number; dieRollEnd: number; npc: string }[] = [
        { id: 0, dieRollStart: 1, dieRollEnd: 4, npc: "All NPCs" },
    ];

    // Load in the die rolls for each of the ships.
    ships.map((ship) =>
        shipsToUpgrade.push({
            id: ship.id,
            dieRollStart: ship.validUpgradeDieRollStart,
            dieRollEnd: ship.validUpgradeDieRollEnd,
            npc: ship.name,
        })
    );
    shipsToUpgrade.sort((a, b) => a.dieRollStart - b.dieRollStart);

    const upgradeShipActions = [
        { id: 1, dieRoll: "01 - 01", effect: "Add 6 to the movement rate of the NPC." },
        { id: 2, dieRoll: "02 - 03", effect: "Add 3 to the movement rate of the NPC." },
        { id: 3, dieRoll: "04 - 05", effect: "Attack uses two dice instead of 1. (Reroll for merchant)." },
        { id: 4, dieRoll: "06 - 07", effect: "Use next higher attack dice. (Reroll for merchant)." },
        { id: 5, dieRoll: "08 - 09", effect: "Defense uses 1 more defense die." },
        { id: 6, dieRoll: "10 - 11", effect: "Use the next higher defense dice." },
        { id: 7, dieRoll: "12 - 12", effect: "Add another activation chip for this NPC to the bag." },
    ];

    const [selectedShipUpgradeRow, setSelectedShipUpgradeRow] = useState(-1);
    const [selectedUpgradeRow, setSelectedUpgradeRow] = useState(-1);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleShipUpgradeRowClick = (index: number) => {
        setSelectedShipUpgradeRow(index);
    };

    const handleUpgradeRowClick = (index: number) => {
        setSelectedUpgradeRow(index);
    };

    const handleCloseDrawer = () => {
        setSelectedShipUpgradeRow(-1);
        setSelectedUpgradeRow(-1);
        setDrawerOpen(false);
    };

    const handleUpgradeButtonClick = () => {
        // Check to be sure this is a valid upgrade
        // Merchant has no attack abilities. Ensure that Merchant w/ either of those upgrades were not selected
        const shipToUpgrade = ships.find((ship) => ship.id === selectedShipUpgradeRow);

        if (
            shipToUpgrade &&
            shipToUpgrade.name === "Merchant" &&
            (selectedUpgradeRow === 3 || selectedUpgradeRow === 4)
        ) {
            toaster.create({
                title: `This upgrade is not applicable for the Merchant. Reroll/Select a different ship/upgrade combination`,
                type: "error",
            });
            return;
        }

        // Upgrade each selected ship where possible
        switch (selectedUpgradeRow) {
            case 1: case 2:
                // First upgrade row is strong change to movement rate
                const increaseFactor: number = selectedUpgradeRow === 1 ? 6 : 3;
                if (selectedShipUpgradeRow === 0) {
                    ships.forEach((ship) => {
                        adjustShipMovementRate(ship.id, increaseFactor);
                        toaster.create({
                            title: `${ship.name}'s movement was increased by ${increaseFactor} `,
                            type: "success",
                        });
                    });
                } else {
                    if (shipToUpgrade) {
                        adjustShipMovementRate(shipToUpgrade.id, increaseFactor);
                        toaster.create({
                            title: `${shipToUpgrade.name}'s movement was increased by ${increaseFactor} `,
                            type: "success",
                        });
                    }
                }
                break;
            case 3:
                if (selectedShipUpgradeRow === 0) {
                    ships.forEach((ship) => {
                        if (ship.attackDie != 0 && ship.numberOfAttackDice === 1) {
                            increaseShipNumberOfAttackDice(ship.id);
                            toaster.create({
                                title: `${ship.name}'s number of attack dice is now two`,
                                type: "success",
                            });
                        } else {
                            if (ship.numberOfAttackDice === 2){
                                toaster.create({
                                    title: `${ship.name}'s number of attack dice is already two. No change was made`,
                                    type: "warning",
                                });
                                
                            } else if (ship.attackDie != 0) {
                                toaster.create({
                                    title: `${ship.name}'s has no attack to upgrade. No change was made`,
                                    type: "warning",
                                });

                            }
                        }
                    });
                } else {
                    if (shipToUpgrade && shipToUpgrade.attackDie != 0 && shipToUpgrade.numberOfAttackDice === 1) {
                        increaseShipNumberOfAttackDice(shipToUpgrade.id);
                        toaster.create({
                            title: `${shipToUpgrade.name}'s number of attack dice is now two`,
                            type: "success",
                        });
                    }
                }
                break;
            case 4:
                if (selectedShipUpgradeRow === 0) {
                    ships.forEach((ship) => {
                        if (ship.attackDie != 0) increaseShipAttackDie(ship.id);
                        toaster.create({
                            title: `${ship.name}'s attack die type up one level`,
                            type: "success",
                        });
                    });
                } else {
                    if (shipToUpgrade && shipToUpgrade.attackDie != 0) {
                        increaseShipAttackDie(shipToUpgrade.id);
                        toaster.create({
                            title: `${shipToUpgrade.name}'s attack die type up one level`,
                            type: "success",
                        });
                    }
                }

                break;
            case 5:
                if (selectedShipUpgradeRow === 0) {
                    ships.forEach((ship) => {
                        if (ship.defenceDie != 0) increaseShipNumberOfDefenceDice(ship.id);
                        toaster.create({
                            title: `${ship.name}'s number of defence dice has increased by 1`,
                            type: "success",
                        });
                    });
                } else {
                    if (shipToUpgrade && shipToUpgrade.defenceDie != 0) {
                        increaseShipNumberOfDefenceDice(shipToUpgrade.id);
                        toaster.create({
                            title: `${shipToUpgrade.name}'s number of defence dice has increased by 1`,
                            type: "success",
                        });
                    }
                }
                break;
            case 6:
                if (selectedShipUpgradeRow === 0) {
                    ships.forEach((ship) => {
                        if (ship.defenceDie != 0 && ship.defenceDie != 20) increaseShipDefenceDie(ship.id);
                        toaster.create({
                            title: `${ship.name}'s defence die type up one level`,
                            type: "success",
                        });
                    });
                } else {
                    if (shipToUpgrade && shipToUpgrade.defenceDie != 0 && shipToUpgrade.defenceDie != 20) {
                        increaseShipDefenceDie(shipToUpgrade.id);
                        toaster.create({
                            title: `${shipToUpgrade.name}'s defence die type up one level`,
                            type: "success",
                        });
                    }
                }
                break;
            case 7:
                if (selectedShipUpgradeRow === 0) {
                    ships.forEach((ship) => {
                        if (ship.numberOfActivationChips != 0) increaseShipNumberOfActivationChips(ship.id);
                        toaster.create({
                            title: `Add another activation chip for ${ship.name} into its vessel`,
                            type: "warning",
                            duration: 4000,
                        });
                    });
                } else {
                    if (shipToUpgrade) {
                        increaseShipNumberOfActivationChips(shipToUpgrade.id);
                        toaster.create({
                            title: `Add another activation chip for ${shipToUpgrade.name} into its vessel`,
                            type: "warning",
                            duration: 4000,
                        });
                    }
                }
                break;
        }

        // Clear the states and close the drawer
        handleCloseDrawer();
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
                                        {shipsToUpgrade.map((entry) => (
                                            <Table.Row
                                                key={entry.id}
                                                onClick={() => handleShipUpgradeRowClick(entry.id)}
                                                backgroundColor={entry.id === selectedShipUpgradeRow ? "green.400" : ""}
                                            >
                                                <Table.Cell fontWeight="bold">
                                                    {" "}
                                                    {entry.dieRollStart.toString().padStart(2, "0")} -{" "}
                                                    {entry.dieRollEnd.toString().padStart(2, "0")}
                                                </Table.Cell>
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
                                        {upgradeShipActions.map((entry) => (
                                            <Table.Row
                                                key={entry.id}
                                                onClick={() => handleUpgradeRowClick(entry.id)}
                                                backgroundColor={entry.id === selectedUpgradeRow ? "green.400" : ""}
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
                                onClick={() => handleUpgradeButtonClick()}
                                disabled={selectedUpgradeRow >= 0 && selectedShipUpgradeRow >= 0 ? false : true}
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
