import { Box, Button, HStack, Stack, Text } from "@chakra-ui/react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useState } from "react";
import type { Ship } from "../hooks/useShip";

interface Props {
    npc: Ship;
}

const Ships = ({ npc }: Props) => {
   const [ship, setShip] = useState(npc)

   const incrementLifePoints = () => {
    setShip({...ship, lifePoints : ship.lifePoints + 1});
  };

  const decrementLifePoints = () => {
    if (ship.lifePoints > 0) {
        setShip({...ship, lifePoints : ship.lifePoints - 1});
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
                    {ship.numberOfAttackDice}D{ship.attackDie} {ship.attackType}
                </Text>
            </Stack>
            <Stack textAlign="left">
                <Text fontSize={headingSize}>Defence</Text>
                <Text fontSize="large">
                    {ship.numberOfDefenceDice}D{ship.defenceDie} {ship.defenceType}
                </Text>
            </Stack>
            <Stack textAlign="left">
                <Text fontSize={headingSize}>Life Points</Text>
                <Text fontSize="large"> {ship.lifePoints}</Text>
                <HStack>
                    <Button colorPalette="red" variant="subtle" size="xs" onClick={decrementLifePoints}>
                        <FaMinus />
                    </Button>
                    <Button colorPalette="green" variant="subtle" size="xs" onClick={incrementLifePoints}>
                        <FaPlus />
                    </Button>
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

export default Ships;
