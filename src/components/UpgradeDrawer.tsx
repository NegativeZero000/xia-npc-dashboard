import { GiSpaceship } from "react-icons/gi";
import { useState } from "react";
import { Text, Button, CloseButton, Drawer, Portal, HStack, Table, Separator, Box } from "@chakra-ui/react";
import { DiceIcon } from "./Icons";
import { Toaster } from "./ui/toaster";

interface Props {
    enforcer: Ship;
    setEnforcerState: (ship: Ship) => void;
    merchant: Ship;
    setMerchantState: (ship: Ship) => void;
    scoundrel: Ship;
    setScoundrelState: (ship: Ship) => void;
    sellsword: Ship;
    setSellswordState: (ship: Ship) => void;
}

const UpgradeDrawer = ({
    enforcer,
    setEnforcerState,
    merchant,
    setMerchantState,
    scoundrel,
    setScoundrelState,
    sellsword,
    setSellswordState,
}: Props) => {
    const shipsToUpgrade = [{ id: 0, dieRollStart: 1, dieRollEnd: 4, npc: "All NPCs" }];

    // Load in the die rolls for each of the ships.
    [enforcer, merchant, scoundrel, sellsword].forEach((ship) =>
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

    function increaseShipMovement(ship: Ship, shipState: any, rateOfChange: number) {
        shipState({ ...ship, movementRate: ship.movementRate + rateOfChange });
    }

    function increaseShipNumberOfDice(ship: Ship, shipState: any, dieType: string) {
        if (validDieType(dieType)) {
            switch (dieType.toLowerCase()) {
                case "attack": {
                    // Attack dice cannot be increased past 2.
                    if (ship.numberOfAttackDice === 1)
                        shipState({ ...ship, numberOfAttackDice: ship.numberOfAttackDice + 1 });
                    break;
                }
                case "defence": {
                    shipState({ ...ship, numberOfDefenceDice: ship.numberOfDefenceDice + 1 });
                    break;
                }
            }
        }
    }

    function addActivationChip(ship: Ship, shipState: any, rateOfChange: number) {
        shipState({ ...ship, numberOfActivationChips: ship.numberOfActivationChips + rateOfChange });
    }

    function validDieType(dieType: string) {
        return dieType.toLowerCase() === "attack" || dieType.toLowerCase() === "defence" ? true : false;
    }

    function nextDie(dieIndex: number) {
        // Given a dieIndex e.g. 6, get the next higher die and return its index
        const nextDieMap: Record<number, number> = {
            4: 6,
            6: 8,
            8: 12,
            12: 20,
        };

        return dieIndex < 20 ? nextDieMap[dieIndex] : dieIndex;
    }

    function increaseDieType(ship: Ship, shipState: any, dieType: string) {
        if (validDieType(dieType)) {
            switch (dieType.toLowerCase()) {
                case "attack": {
                    shipState({ ...ship, attackDie: nextDie(ship.attackDie) });
                    break;
                }
                case "defence": {
                    shipState({ ...ship, defenceDie: nextDie(ship.defenceDie) });
                    break;
                }
            }
        }
    }

    const handleUpgradeButtonClick = () => {
        // Check to be sure this is a valid upgrade
        // Merchant has no attack abilities. Ensure that Merchant w/ either of those upgrades were not selected
        const merchantShip = shipsToUpgrade.find((ship) => ship.npc === "Merchant");
        if (
            merchantShip &&
            selectedShipUpgradeRow === merchantShip.id &&
            (selectedUpgradeRow === 3 || selectedUpgradeRow === 4)
        ) {
            setErrorMessage("You cannot use this upgrade for the merchant ship. Select another");
            setShowErrorAlert(true);
            return;
        }

        // Upgrade each selected ship where possible
        if (selectedShipUpgradeRow === 0) {
            // This needs to upgrade each ship
            switch (selectedUpgradeRow) {
                case 1:
                    increaseShipMovement(enforcer, setEnforcerState, 6);
                    increaseShipMovement(merchant, setMerchantState, 6);
                    increaseShipMovement(scoundrel, setScoundrelState, 6);
                    increaseShipMovement(sellsword, setSellswordState, 6);
                    break;
                case 2:
                    increaseShipMovement(enforcer, setEnforcerState, 3);
                    increaseShipMovement(merchant, setMerchantState, 3);
                    increaseShipMovement(scoundrel, setScoundrelState, 3);
                    increaseShipMovement(sellsword, setSellswordState, 3);
                    break;
                case 3:
                    increaseShipNumberOfDice(enforcer, setEnforcerState, "attack");
                    increaseShipNumberOfDice(merchant, setMerchantState, "attack");
                    increaseShipNumberOfDice(scoundrel, setScoundrelState, "attack");
                    increaseShipNumberOfDice(sellsword, setSellswordState, "attack");
                    break;
                case 4:
                    increaseDieType(enforcer, setEnforcerState, "attack");
                    increaseDieType(merchant, setMerchantState, "attack");
                    increaseDieType(scoundrel, setScoundrelState, "attack");
                    increaseDieType(sellsword, setSellswordState, "attack");
                    break;
                case 5:
                    increaseShipNumberOfDice(enforcer, setEnforcerState, "defence");
                    increaseShipNumberOfDice(merchant, setMerchantState, "defence");
                    increaseShipNumberOfDice(scoundrel, setScoundrelState, "defence");
                    increaseShipNumberOfDice(sellsword, setSellswordState, "defence");
                    break;
                case 6:
                    increaseDieType(enforcer, setEnforcerState, "defence");
                    increaseDieType(merchant, setMerchantState, "defence");
                    increaseDieType(scoundrel, setScoundrelState, "defence");
                    increaseDieType(sellsword, setSellswordState, "defence");
                    break;
                case 7:
                    addActivationChip(enforcer, setEnforcerState, 1);
                    addActivationChip(merchant, setMerchantState, 1);
                    addActivationChip(scoundrel, setScoundrelState,1);
                    addActivationChip(sellsword, setSellswordState, 1);
                    break;
            }
        } else {
            // This needs to upgrade the single selected ship

            switch (selectedUpgradeRow) {
                case 1:
                    break;
                case 2:
                    break;
                case 3:
                    break;
                case 4:
                    break;
                case 5:
                    break;
                case 6:
                    break;
                case 7:
                    break;
            }
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
