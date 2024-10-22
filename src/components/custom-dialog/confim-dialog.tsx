import type { DialogProps } from '@mui/material/Dialog';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { IconButton } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { Iconify } from '../iconify';

// ----------------------------------------------------------------------

type ConfirmDialogProps = Omit<DialogProps, 'title' | 'content'> & {
    title: React.ReactNode;
    content?: React.ReactNode;
    action?: React.ReactNode;
    onClose: VoidFunction;
    maxWidth?: string;
};


export default function ConfirmDialog({
    title,
    content,
    action,
    open,
    onClose,
    maxWidth,
    ...other
}: ConfirmDialogProps) {
    return (
            <Dialog fullWidth maxWidth={maxWidth} open={open} onClose={onClose} {...other}>
                <DialogTitle sx={{ pb: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>{title}
                    <IconButton onClick={onClose}>
                        <Iconify icon="akar-icons:cross" />
                    </IconButton>
                </DialogTitle>

                {content && <DialogContent sx={{ typography: 'body2' }}> {content} </DialogContent>}
                <DialogActions sx={{ pr: 3, pb: 3 }}>
                    {action}
                    <Button variant="outlined" color="inherit" onClick={onClose}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
    );
}
