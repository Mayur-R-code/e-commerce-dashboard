
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Button, Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import { useBoolean } from 'src/hooks/use-boolean';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import ConfirmDialog from 'src/components/custom-dialog/confim-dialog';

// ----------------------------------------------------------------------

export type UserProps = {
  id: string;
  fullName: string;
  role: string;
  status: string;
  company: string;
  avatarUrl: string;
  isVerified: boolean;
  isActive: boolean;
};

type UserTableRowProps = {
  row: UserProps;
  selected: boolean;
  onSelectRow: () => void;
  onEditRow: () => void;
  onDeleteRow: () => void;
};

export function UserTableRow({ row, selected, onSelectRow, onEditRow, onDeleteRow }: UserTableRowProps) {
  const userDelete = useBoolean();
  const userEdit = useBoolean()

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        {/* <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell> */}

        <TableCell component="th" scope="row">
          <Box gap={2} display="flex" alignItems="center">
            <Avatar alt={row.fullName} src={row.avatarUrl} />
            {row.fullName}
          </Box>
        </TableCell>

        <TableCell>{row.company}</TableCell>

        <TableCell>{row.role}</TableCell>

        {/* <TableCell align="center">
          {row.isVerified ? (
            <Iconify width={22} icon="solar:check-circle-bold" sx={{ color: 'success.main' }} />
          ) : (
            '-'
          )}
        </TableCell> */}

        <TableCell>
          <Label color={(row.isActive === false && 'error') || 'success'}>{row.isActive === false ? "Inactive" : "Active"}</Label>
        </TableCell>
        <TableCell align="right">
          <Tooltip title="Edit User" placement="top" arrow>
            <IconButton color="inherit" onClick={onEditRow}>
              <Iconify icon="solar:pen-bold" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete User" placement="top" arrow>
            <IconButton color="error" onClick={userDelete.onTrue}>
              <Iconify icon="solar:trash-bin-trash-bold" />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
      <ConfirmDialog
        open={userDelete.value}
        onClose={userDelete.onFalse}
        title="Delete"
        maxWidth="xs"
        content="Are you sure you want to delete this user?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button >
        }
      />
      <ConfirmDialog
        open={userEdit.value}
        onClose={userEdit.onFalse}
        title="Edit User"
        maxWidth='md'
        action={
          <Button variant="contained" onClick={() => userEdit.onFalse()
          }>
            Submit
          </Button >
        }
      />
    </>
  );
}
