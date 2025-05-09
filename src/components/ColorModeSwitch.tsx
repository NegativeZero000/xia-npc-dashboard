"use client"

import { HStack, Switch } from "@chakra-ui/react"
import { useColorMode } from "../components/ui/color-mode"

const ColorModeSwitch = () => {
  const { toggleColorMode,colorMode } = useColorMode()
  return (
    <HStack>
    <Switch.Root colorPalette='green' checked={colorMode === 'dark'} onCheckedChange={toggleColorMode}>
    <Switch.HiddenInput />
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
      <Switch.Label whiteSpace="nowrap">Dark Mode</Switch.Label>
    </Switch.Root>

    {/* <Button variant="outline" onClick={toggleColorMode}>
      Toggle Mode
    </Button> */}

    </HStack>
  )
}

export default ColorModeSwitch