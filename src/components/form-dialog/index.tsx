import type { DialogProps } from '@mui/material/Dialog';

import React from 'react';

import Dialog from '@mui/material/Dialog';
import { Stack, IconButton } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { Iconify } from '../iconify';


type FormDialogProps = {
    dialogTitle: string;
    dialogContent: any; // generally you want to pass elements that holds up the content
    dialogActions?: any; // generally you want to pass action buttons here
    open: boolean;
    onClose: () => void;
    maxWidth?: DialogProps['maxWidth'];
    dialogSubTitle?: string | React.ReactNode;
    showSubTitle?: boolean;
};



export default function FormDialog({
    dialogTitle,
    dialogContent,
    dialogActions,
    open,
    onClose,
    maxWidth,
    dialogSubTitle = '',
    showSubTitle = false,
}: FormDialogProps) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="draggable-dialog-title"
            fullWidth
            maxWidth={maxWidth ?? 'md'}
        >
            <DialogTitle  id="draggable-dialog-title">
                <Stack direction="row" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    {dialogTitle}
                    <IconButton onClick={onClose}>
                        <Iconify icon="akar-icons:cross" />
                    </IconButton>
                </Stack>
                {showSubTitle && <>{dialogSubTitle}</>}
            </DialogTitle>

            <DialogContent>{dialogContent}</DialogContent>
            <DialogActions>{dialogActions}</DialogActions>
        </Dialog>
    );
}
