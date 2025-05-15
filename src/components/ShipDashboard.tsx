import { Button, Group, HStack, Stack, Text } from "@chakra-ui/react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Credits, DiceIcon } from "./Icons";

interface Props {
    ship: Ship;
    setShip: (ship: Ship) => void;
}

const ShipDashboard = ({ ship, setShip }: Props) => {
    const incrementLifePoints = () => {
        setShip({ ...ship, lifePoints: ship.lifePoints + 1 });
    };

    const decrementLifePoints = () => {
        if (ship.lifePoints > 0) {
            setShip({ ...ship, lifePoints: ship.lifePoints - 1 });
        }
    };
    const incrementCredits = () => {
        setShip({ ...ship, credits: ship.credits + 1 });
    };

    const decrementCredits = () => {
        if (ship.credits > 0) {
            setShip({ ...ship, credits: ship.credits - 1 });
        }
    };

    const headingSize = "sm";
    return (
        <HStack padding={3} gap={2}>
            <Stack textAlign="left">
                <Text fontSize={headingSize}>Name</Text>
                <Text fontSize="large"> {ship.name}</Text>
            </Stack>
            <Stack textAlign="left">
                <Text fontSize={headingSize}>Spawn</Text>
                <Text fontSize="large"> {ship.spawn}</Text>
            </Stack>
            <Stack textAlign="left">
                <Text fontSize={headingSize}>Movement</Text>
                <Text fontSize="large"> {ship.movementRate}</Text>
            </Stack>
            <Stack textAlign="left">
                <Text fontSize={headingSize}>Attack</Text>
                <Text fontSize="large">
                    {ship.numberOfAttackDice}
                    <DiceIcon dieIndex={ship.attackDie} /> {ship.attackType}
                </Text>
            </Stack>
            <Stack textAlign="left">
                <Text fontSize={headingSize}>Defence</Text>
                <Text fontSize="large">
                    {ship.numberOfDefenceDice}
                    <DiceIcon dieIndex={ship.defenceDie} /> {ship.defenceType}
                </Text>
            </Stack>
            <Stack textAlign="left">
                <Text fontSize={headingSize}>Life Points</Text>
                <Text fontSize="large"> {ship.lifePoints}</Text>
                <HStack>
                    <Group attached>
                        <Button colorPalette="red" variant="subtle" size="xs" onClick={decrementLifePoints}>
                            <FaMinus />
                        </Button>
                        <Button colorPalette="green" variant="subtle" size="xs" onClick={incrementLifePoints}>
                            <FaPlus />
                        </Button>
                    </Group>
                </HStack>
            </Stack>
            <Stack textAlign="left">
                <Stack textAlign="left">
                    <Text fontSize={headingSize}>Credits</Text>

                    <Text fontSize="large" wordWrap="normal">
                        {ship.credits * 1000} <Credits size="md" color="gray.400" />
                    </Text>
                </Stack>
                <HStack>
                    <Group attached>
                        <Button colorPalette="red" variant="subtle" size="xs" onClick={decrementCredits}>
                            <FaMinus />
                        </Button>
                        <Button colorPalette="green" variant="subtle" size="xs" onClick={incrementCredits}>
                            <FaPlus />
                        </Button>
                    </Group>
                </HStack>
            </Stack>
            <Stack textAlign="left">
                <Text fontSize={headingSize}>On Kill</Text>
                <Text fontSize="large">
                    {ship.baseRewardFamePoints}FP + {ship.bounties} bounites
                </Text>
            </Stack>
            <Stack textAlign="left">
                <HStack>
                    <Text fontSize="large">Target</Text>
                    <Text fontSize="initial">{ship.targetPreference}</Text>
                </HStack>
                <HStack>
                    <Text fontSize="large">Target Path</Text>
                    <Text fontSize="initial">{ship.targetPath}</Text>
                </HStack>
            </Stack>
        </HStack>
    );
};

export default ShipDashboard;
