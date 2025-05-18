import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";

interface Props {
    triggerButtonColorPalette?: string;
    commitTitle: string;
    commitBody: string;
    commitButtonName: string;
    onCommit: () => void;
    children?: React.ReactNode;
}

export const AlertDialog = ({
    triggerButtonColorPalette = "red",
    commitTitle,
    commitBody,
    commitButtonName,
    onCommit,
    children = "Hello",
}: Props) => {
    return (
        <Dialog.Root role="alertdialog">
            <Dialog.Trigger asChild>
                <Button variant="subtle" size="sm" colorPalette={triggerButtonColorPalette}>
                    {children}
                </Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>{commitTitle}</Dialog.Title>
                            {/* Close (X) Button */}
                            <Dialog.CloseTrigger asChild>
                                <CloseButton size="sm" />
                            </Dialog.CloseTrigger>
                        </Dialog.Header>
                        <Dialog.Body>
                            <p>{commitBody}</p>
                        </Dialog.Body>
                        <Dialog.Footer>
                            {/* Cancel Button closes dialog via CloseTrigger */}
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                            </Dialog.ActionTrigger>

                            {/* Commit Button just does the action */}
                            <Dialog.ActionTrigger asChild>
                                <Button colorPalette="red" onClick={onCommit}>
                                    {commitButtonName}
                                </Button>
                            </Dialog.ActionTrigger>
                        </Dialog.Footer>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
};
