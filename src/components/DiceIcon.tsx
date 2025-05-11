import {D6, D8, D10, D12} from "./Dice"

interface Props {
    dieIndex: number;
    color: string
}

const components = {
    "d6": D6,
    "d8": D8,
    "d10": D10,
    "d12": D12
};

const DiceIcon = ({ dieIndex, color }: Props) => {
    const SpecificDie = components["d" + dieIndex.toString() as keyof typeof components];
    return <SpecificDie size="lg" color={color}/>
};

export default DiceIcon;
