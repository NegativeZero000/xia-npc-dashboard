import { GiSpaceship } from "react-icons/gi";
import { useState } from "react";
import { Text, Button, CloseButton, Drawer, Portal, HStack, Table, Separator, Box } from "@chakra-ui/react";
import { DiceIcon } from "./Icons";
import { Toaster } from "./ui/toaster";
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
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleShipUpgradeRowClick = (index: number) => {
        setSelectedShipUpgradeRow(index);
        setShowErrorAlert(false);
    };
    const handleUpgradeRowClick = (index: number) => {
        setSelectedUpgradeRow(index);
        setShowErrorAlert(false);
    };

    const handleCloseDrawer = () => {
        setSelectedShipUpgradeRow(-1);
        setSelectedUpgradeRow(-1);
        setDrawerOpen(false);
        setShowErrorAlert(false);
    };

    const handleUpgradeButtonClick = () => {
        // Check to be sure this is a valid upgrade
        // Merchant has no attack abilities. Ensure that Merchant w/ either of those upgrades were not selected
        const shipToUpgrade = ships.find((ship) => ship.id === selectedShipUpgradeRow)

        if (
            shipToUpgrade &&
            shipToUpgrade.name === "Merchant" &&
            (selectedUpgradeRow === 3 || selectedUpgradeRow === 4)
        ) {
            setErrorMessage("You cannot use this upgrade for the Merchant ship. Select another");
            setShowErrorAlert(true);
            return;
        }

        // Upgrade each selected ship where possible
        switch (selectedUpgradeRow) {
            case 1:
                if (selectedShipUpgradeRow === 0) {
                    ships.forEach((ship) => {
                        adjustShipMovementRate(ship.id, 6);
                    });
                } else {
                    if(shipToUpgrade) adjustShipMovementRate(shipToUpgrade.id, 6);
                }
                break;
            case 2:
                if (selectedShipUpgradeRow === 0) {
                    ships.forEach((ship) => {
                        adjustShipMovementRate(ship.id, 3);
                    });
                } else {
                    if(shipToUpgrade) adjustShipMovementRate(shipToUpgrade.id, 3);
                }
                break;
            case 3:
                if (selectedShipUpgradeRow === 0) {
                    ships.forEach((ship) => {
                        if (ship.attackDie != 0 && ship.numberOfAttackDice === 1) increaseShipNumberOfAttackDice(ship.id);
                    });
                } else {
                    if(shipToUpgrade && shipToUpgrade.attackDie != 0 && shipToUpgrade.numberOfAttackDice === 1){
                        increaseShipNumberOfAttackDice(shipToUpgrade.id);
                    }
                }
                break;
            case 4:
                if (selectedShipUpgradeRow === 0) {
                    ships.forEach((ship) => {
                        if (ship.attackDie != 0) increaseShipAttackDie(ship.id);
                    });
                } else {
                    if(shipToUpgrade && shipToUpgrade.attackDie != 0){
                        increaseShipAttackDie(shipToUpgrade.id);
                    }
                }

                break;
            case 5:
                if (selectedShipUpgradeRow === 0) {
                    ships.forEach((ship) => {
                        if (ship.defenceDie != 0) increaseShipNumberOfDefenceDice(ship.id);
                    });
                } else {
                    if(shipToUpgrade && shipToUpgrade.defenceDie != 0){
                        increaseShipNumberOfDefenceDice(shipToUpgrade.id);
                    }
                }
                break;
            case 6:
                if (selectedShipUpgradeRow === 0) {
                    ships.forEach((ship) => {
                        if (ship.defenceDie != 0) increaseShipDefenceDie(ship.id);
                    });
                } else {
                    if(shipToUpgrade && shipToUpgrade.defenceDie != 0){
                        increaseShipDefenceDie(shipToUpgrade.id);
                    }
                }
                break;
            case 7:
                if (selectedShipUpgradeRow === 0) {
                    ships.forEach((ship) => {
                        if (ship.numberOfActivationChips != 0) increaseShipNumberOfActivationChips(ship.id);
                    });
                } else {
                    if(shipToUpgrade){
                        increaseShipNumberOfActivationChips(shipToUpgrade.id);
                    }
                }
                break;
        }

        // Perform the upgrade
        // Clear the states and close the drawer
        handleCloseDrawer();
    };

    return (
        <>
            <Toaster />
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
                                    As the game of XIA progresses into the midgame / endgame, the NPCs become less
                                    relevant and less of a threat to the players. These upgrades will compensate for
                                    that.
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
                                                    backgroundColor={
                                                        entry.id === selectedShipUpgradeRow ? "green.400" : ""
                                                    }
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
                                {showErrorAlert && <Text color="red.emphasized">{errorMessage}</Text>}
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
        </>
    );
};

export default UpgradeDrawer;
