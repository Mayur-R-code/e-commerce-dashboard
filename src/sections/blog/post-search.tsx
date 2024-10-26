import type { Theme, SxProps } from '@mui/material/styles';

import { IconButton } from '@mui/material';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';

import { Iconify } from 'src/components/iconify';

import type { PostItemProps } from './post-item';

// ----------------------------------------------------------------------

type PostSearchProps = {
  posts: PostItemProps[];
  sx?: SxProps<Theme>;
  onFilterChange: (value: any) => void
  onClearFilter: VoidFunction;
  filterName: any

};

export function PostSearch({ posts, sx, onFilterChange, onClearFilter, filterName }: PostSearchProps) {
  return (
    <Autocomplete
      sx={{
        width: 280, "& .MuiInputBase-formControl": {
          paddingRight: "15px !important"
        }
      }}
      autoHighlight
      popupIcon={null}
      slotProps={{
        paper: {
          sx: {
            width: 320,
            [`& .${autocompleteClasses.option}`]: {
              typography: 'body2',
            },
            ...sx,

          },
        },
      }}
      options={posts}
      value={filterName ? posts.find((post) => post.title === filterName) : null}
      onChange={(_, event) => onFilterChange(event)}
      getOptionLabel={(post) => post.title}
      // isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search post..."
          sx={{
            "& .MuiAutocomplete-endAdornment": {
              display: "none"
            }
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={onClearFilter} >
                  <Iconify
                    icon="eva:close-fill"
                    sx={{ width: 20, height: 20, color: 'text.disabled', cursor: 'pointer' }}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
}
