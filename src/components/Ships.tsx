import { Box, HStack, Stack, Text } from "@chakra-ui/react";
import type { Ship } from "../hooks/useShip";

interface Props {
    ship: Ship;
}

const Ships = ({ ship }: Props) => {
    const headingSize = "sm"
    return (
        <HStack padding={3} gap={2}>
            <Stack textAlign="left" >
                <Text fontSize={headingSize}>Name</Text>
                <Text fontSize="large"> {ship.name}</Text>
            </Stack>
            <Stack textAlign="left" >
                <Text fontSize={headingSize}>Spawn</Text>
                <Text fontSize="large"> {ship.spawn}</Text>
            </Stack>
            <Stack textAlign="left" >
                <Text fontSize={headingSize}>Movement</Text>
                <Text fontSize="large"> {ship.movementRate}</Text>
            </Stack>
            <Stack textAlign="left" >
                <Text fontSize={headingSize}>Attack</Text>
                <Text fontSize="large"> {ship.numberOfAttackDice}D{ship.attackDie} {ship.attackType}</Text>
            </Stack>
            <Stack textAlign="left" >
                <Text fontSize={headingSize}>Defence</Text>
                <Text fontSize="large"> {ship.numberOfDefenceDice}D{ship.defenceDie} {ship.defenceType}</Text>
            </Stack>
            <Stack textAlign="left" >
                <Text fontSize={headingSize}>Life Points</Text>
                <Text fontSize="large"> {ship.lifePoints}</Text>
            </Stack>
            <Stack textAlign="left" >
                <Text fontSize={headingSize}>On Kill</Text>
                <Text fontSize="large"> {ship.baseRewardFamePoints}FP + {ship.bounties} bounites</Text>
            </Stack>
        </HStack>
    );
};

export default Ships;
