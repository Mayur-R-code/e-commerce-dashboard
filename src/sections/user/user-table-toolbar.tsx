import Toolbar from '@mui/material/Toolbar';
import { Button, IconButton } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type UserTableToolbarProps = {
  filterName: string;
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setFilterName: any;
};

export function UserTableToolbar({ filterName, onFilterName, setFilterName }: UserTableToolbarProps) {
  return (
    <Toolbar
      sx={{
        height: 96,
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: "wrap",
        p: (theme) => theme.spacing(0, 1, 0, 3),
      }}
    >
      <OutlinedInput
        fullWidth
        value={filterName}
        onChange={onFilterName}
        placeholder="Search user..."
        endAdornment={
          filterName && (
            <InputAdornment position="end">
              <IconButton onClick={() => setFilterName("")}>
                <Iconify
                  icon="eva:close-fill"
                  sx={{ width: 20, height: 20, color: 'text.disabled', cursor: 'pointer' }}
                />
              </IconButton>
            </InputAdornment>
          )
        }
        sx={{ maxWidth: 320 }}
      />
      {filterName && <Button color='error' startIcon={<Iconify icon="solar:trash-bin-2-bold" />} onClick={() => setFilterName("")} > Clear All</Button>}
    </Toolbar >
  );
}
