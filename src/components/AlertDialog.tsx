import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { useState } from "react";

interface Props {
    triggerButtonColorPalette?: string
    commitTitle: string;
    commitBody: string;
    commitButtonName: string
    onCommit: () => void;
    children?: React.ReactNode;
}

export const AlertDialog = ({triggerButtonColorPalette="red", commitTitle, commitBody, commitButtonName, onCommit, children="Hello" }: Props) => {
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleClose = () => {
        setDialogOpen(false)
    }
    
    return (
        <Dialog.Root role="alertdialog" open={dialogOpen} onOpenChange={(event) => setDialogOpen(event.open)}>
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
                        </Dialog.Header>
                        <Dialog.Body>
                            <p>{commitBody}</p>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                            </Dialog.ActionTrigger>
                            <Button colorPalette="red" onClick={() => { onCommit(); handleClose(); }}>{commitButtonName}</Button>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" onClick={handleClose} />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
};
