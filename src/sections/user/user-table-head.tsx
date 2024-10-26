import Box from '@mui/material/Box';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';

import { Iconify } from 'src/components/iconify';

import { visuallyHidden } from './utils';

// ----------------------------------------------------------------------

type UserTableHeadProps = {
  orderBy: string;
  order: 'asc' | 'desc';
  onSort: (id: string) => void;
  headLabel: Record<string, any>[];
};

export function UserTableHead({
  order,
  onSort,
  orderBy,
  headLabel,
}: UserTableHeadProps) {
  return (
    <TableHead>
      <TableRow>
        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align || 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ width: headCell.width, minWidth: headCell.minWidth }}
          >
            <TableSortLabel
              disabled={headCell.diableSort}
              hideSortIcon={headCell.diableSort}
              // active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              IconComponent={() => (
                <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '6px' }}>
                  <Iconify
                    icon="ri:arrow-up-s-line"
                    width="18px"
                    height="18px"
                    marginBottom="-7px"
                    style={{
                      color:
                        orderBy === headCell.id && order === 'asc' ? '#000' : 'gray'
                    }}
                  />
                  <Iconify
                    icon="ri:arrow-down-s-line"
                    width="18px"
                    height="18px"
                    style={{
                      color:
                        orderBy === headCell.id && order === 'desc' ? '#000' : 'gray'
                    }}
                  />
                </Box>
              )}
              onClick={() => onSort(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box sx={{ ...visuallyHidden }}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
