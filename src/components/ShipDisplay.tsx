import { FaHeartBroken, FaMinus, FaPlus } from "react-icons/fa";
import { Box, Button, Grid, GridItem, Group, HStack, Icon, Separator, Show, Stack, Text } from "@chakra-ui/react";
import { Credits, DiceIcon } from "./Icons";
import type { Ship, UseShips } from "../hooks/useShips";
import { ImHeart } from "react-icons/im";
import { FiTarget } from "react-icons/fi";
import { BsGeoAltFill } from "react-icons/bs";
import { AlertDialog } from "./AlertDialog";
import { InfoTip } from "./ui/toggle-tip";

interface Props {
    ship: Ship;
    shipManager: UseShips;
}

const ShipDashboard = ({ ship, shipManager }: Props) => {
    const { adjustShipLifePoints, adjustShipCredits, adjustShipBounties, resetShip } = shipManager;

    const headingSize = "xs";
    const giPadding = 1;
    return (
        <Box
            borderWidth="1px"
            borderRadius="xl"
            boxShadow="md"
            padding={4}
            borderColor="gray.600" // or "gray.50" for subtle contrast
            maxW="75%"
            marginBottom={2}
            marginLeft={4}
        >
            <Grid
                // Template Areas
                // hd: Headers
                // im: Image
                // ax: Attack
                // dx: Defence
                // lp: Life Points
                // crd: Credits
                // rwd: On Kill / Reward
                // tgt: Targeting
                // lpc: Life Points Controls
                // cpc: Credits Controls
                // btc: Bounty Controls

                templateAreas={{
                    base: `
                        "hd  hd  hd  hd  hd  hd  hd  hd  hd  hd  hd"
                        "im  mv  ax  dx  lp  crd rwd tgt tgt tgt upg"
                        "im  .   .   .   lpc cpc btc tgt tgt tgt upg"
                    `,
                }}
                templateColumns={{
                    base: "120px repeat(10, 1fr)",
                }}
            >
                <GridItem area="hd" padding={giPadding}>
                    <HStack>
                        <Text letterSpacing={5} fontWeight="bold">
                            {ship.name}
                        </Text>
                        <Separator flex="1" />
                    </HStack>
                </GridItem>
                <GridItem area="im" padding={giPadding}>
                    <img src={ship.imagePath} />
                </GridItem>
                <GridItem area="mv" padding={giPadding}>
                    <Stack textAlign="left">
                        <Text fontSize={headingSize}>Movement</Text>
                        <HStack>
                            <Text fontSize="large">
                                {ship.altenateMovementRate
                                    ? `${ship.movementRate} / ${ship.altenateMovementRate}`
                                    : ship.movementRate}
                            </Text>
                            <Show when={ship.altenateMovementRate > 0}>
                                <InfoTip content={ship.altenateMovementCondition} />
                            </Show>
                        </HStack>
                    </Stack>
                </GridItem>
                <GridItem area="ax" padding={giPadding}>
                    <Stack textAlign="left" hidden={ship.numberOfAttackDice > 0 ? false : true}>
                        <Text fontSize={headingSize}>Attack</Text>
                        <HStack>
                            <Text fontSize="large">{ship.numberOfAttackDice} </Text>
                            <DiceIcon dieIndex={ship.attackDie} />
                            <Text>{ship.attackType}</Text>
                        </HStack>
                    </Stack>
                </GridItem>
                <GridItem area="dx " padding={giPadding}>
                    <Stack textAlign="left">
                        <Text fontSize={headingSize}>Defence</Text>
                        <HStack>
                            <Text fontSize="large">{ship.numberOfDefenceDice} </Text>
                            <DiceIcon dieIndex={ship.defenceDie} />
                            <Text>{ship.defenceType}</Text>
                        </HStack>
                    </Stack>
                </GridItem>
                <GridItem area="lp" padding={giPadding}>
                    <Stack textAlign="left">
                        <Text fontSize={headingSize}>Life Points</Text>
                        <HStack>
                            <Text fontSize="large"> {ship.lifePoints}</Text>
                            <Icon as={ship.lifePoints > 0 ? ImHeart : FaHeartBroken} color="red.500" boxSize={5} />
                        </HStack>
                    </Stack>
                </GridItem>
                <GridItem area="lpc" padding={giPadding}>
                    <HStack>
                        <Group attached>
                            <Button
                                colorPalette="red"
                                variant="subtle"
                                size="xs"
                                onClick={() => {
                                    adjustShipLifePoints(ship.id, -1);
                                }}
                            >
                                <FaMinus />
                            </Button>
                            <Button
                                colorPalette="green"
                                variant="subtle"
                                size="xs"
                                onClick={() => {
                                    adjustShipLifePoints(ship.id, 1);
                                }}
                            >
                                <FaPlus />
                            </Button>
                        </Group>
                    </HStack>
                </GridItem>
                <GridItem area="crd" padding={giPadding}>
                    <Stack textAlign="left">
                        <Text fontSize={headingSize}>Credits</Text>

                        <Text fontSize="large" wordWrap="normal">
                            {ship.credits * 1000} <Credits size="md" color="gray.400" />
                        </Text>
                    </Stack>
                </GridItem>
                <GridItem area="cpc" padding={giPadding}>
                    <HStack>
                        <Group attached>
                            <Button
                                colorPalette="red"
                                variant="subtle"
                                size="xs"
                                onClick={() => {
                                    adjustShipCredits(ship.id, -1);
                                }}
                            >
                                <FaMinus />
                            </Button>
                            <Button
                                colorPalette="green"
                                variant="subtle"
                                size="xs"
                                onClick={() => {
                                    adjustShipCredits(ship.id, 1);
                                }}
                            >
                                <FaPlus />
                            </Button>
                        </Group>
                    </HStack>
                </GridItem>
                <GridItem area="rwd" padding={giPadding}>
                    <Stack textAlign="left">
                        <Text fontSize={headingSize}>On Kill</Text>
                        <Text fontSize="large">
                            {ship.baseRewardFamePoints}FP + {ship.bounties} Bounties
                        </Text>
                    </Stack>
                </GridItem>
                <GridItem area="btc" padding={giPadding}>
                    <HStack>
                        <Group attached>
                            <Button
                                colorPalette="red"
                                variant="subtle"
                                size="xs"
                                onClick={() => {
                                    adjustShipBounties(ship.id, -1);
                                }}
                            >
                                <FaMinus />
                            </Button>
                            <Button
                                colorPalette="green"
                                variant="subtle"
                                size="xs"
                                onClick={() => {
                                    adjustShipBounties(ship.id, 1);
                                }}
                            >
                                <FaPlus />
                            </Button>
                        </Group>
                    </HStack>
                </GridItem>
                <GridItem area="tgt" padding={giPadding}>
                    <Stack textAlign="left">
                        <HStack hidden={ship.targetPreference ? false : true}>
                            <Icon as={FiTarget} color="red.500" boxSize={5} />
                            <Text fontSize="initial">{ship.targetPreference}</Text>
                        </HStack>
                        <HStack>
                            <Icon as={BsGeoAltFill} color="green.500" boxSize={5} />
                            <Text fontSize="initial">{ship.targetPath}</Text>
                        </HStack>
                    </Stack>
                </GridItem>
                <GridItem area="upg" padding={giPadding}>
                    <AlertDialog
                        commitTitle="Factory Reset"
                        commitBody={`Do you really want to reset the ${ship.name} back to it's defaults?`}
                        commitButtonName="Reset"
                        onCommit={() => resetShip(ship.id)}
                    >
                        Reset
                    </AlertDialog>
                </GridItem>
            </Grid>
        </Box>
    );
};

export default ShipDashboard;
