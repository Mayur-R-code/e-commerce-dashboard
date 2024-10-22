import toast from 'react-hot-toast';
import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { useBoolean } from 'src/hooks/use-boolean';

import { DashboardContent } from 'src/layouts/dashboard';
import { deleteUserApi, getUserListApi } from 'src/api/user';

import { Iconify } from 'src/components/iconify';
import FormDialog from 'src/components/form-dialog';
import { Scrollbar } from 'src/components/scrollbar';

import UserForm from './user-form';
import UserEditForm from './user-edit-form';
import { TableNoData } from '../table-no-data';
import { UserTableRow } from '../user-table-row';
import { UserTableHead } from '../user-table-head';
import { TableEmptyRows } from '../table-empty-rows';
import { UserTableToolbar } from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';


// ----------------------------------------------------------------------

export function UserView() {
  const table = useTable();
  const addUser = useBoolean()
  const openEditUser = useBoolean()

  const [filterName, setFilterName] = useState('');
  const [userList, setUserList] = useState([])
  const [userEditId, setUserEditId] = useState<string>('');


  const dataFiltered: any = applyFilter({
    inputData: userList,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
    name: 'fullName',
  });

  const notFound = !dataFiltered.length && !!filterName;

  // function to fetch user list
  const fetchUserList = useCallback(async () => {
    try {
      const response = await getUserListApi();
      if (response?.status === 200) {
        setUserList(response.data);
      }
      // Handle the response
    } catch (error) {
      console.error('Error fetching user list:', error);
    }
  }, []);

  // function to handle edit action
  const handleEditAction = useCallback(
    async (id: string) => {
      setUserEditId(id);
      openEditUser.onTrue();
    },
    [setUserEditId, openEditUser]
  );

  // function to delete user 
  const handleDeleteAction = useCallback(
    async (id: string) => {
      try {
        const response = await deleteUserApi(id);
        if (response?.status === 200) {
          fetchUserList();
          toast.success("User deleted successfully");
        }
        // Handle the response
      } catch (error) {
        console.error('Error deleting user:', error);
        toast.error("Failed to delete user");
      }
    },
    [fetchUserList]
  );

  useEffect(() => {
    fetchUserList()
  }, [fetchUserList])



  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5} justifyContent="space-between">
        <Typography variant="h4">
          Users
        </Typography>
        <Button onClick={addUser.onTrue}
          variant="outlined"
          startIcon={<Iconify icon="solar:add-square-bold" />}
        >
          New user
        </Button>
      </Box>

      <Card>
        <UserTableToolbar
          numSelected={table.selected.length}
          filterName={filterName}
          onFilterName={(event: React.ChangeEvent<HTMLInputElement>) => {
            setFilterName(event.target.value);
            table.onResetPage();
          }}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={userList.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    userList.map((user: any) => user.id)
                  )
                }
                headLabel={[
                  { id: 'name', label: 'Name', width: 260 },
                  { id: 'company', label: 'Company', width: 260 },
                  { id: 'role', label: 'Role', width: 220 },
                  // { id: 'isVerified', label: 'Verified', align: 'center', width: 130 },
                  { id: 'status', label: 'Status', width: 130 },
                  { id: '', label: "Actions", diableSort: true, align: 'center', width: 130 },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row: any) => (
                    <UserTableRow
                      key={row.id}
                      row={row}
                      selected={table.selected.includes(row.id)}
                      onSelectRow={() => table.onSelectRow(row.id)}
                      onEditRow={() => handleEditAction(row.id)}
                      onDeleteRow={() => handleDeleteAction(row.id)}
                    />
                  ))}

                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, userList.length)}
                />

                {notFound && <TableNoData searchQuery={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={userList.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
      <FormDialog dialogTitle="Add User"
        dialogContent={
          <UserForm handleDialogClose={addUser.onFalse} fetchUserList={fetchUserList} />
        }
        open={addUser.value}
        onClose={addUser.onFalse}
        maxWidth="md" />

      <FormDialog dialogTitle="Edit User"
        dialogContent={
          <UserEditForm handleDialogClose={openEditUser.onFalse} fetchUserList={fetchUserList} userEditId={userEditId} />
        }
        open={openEditUser.value}
        onClose={openEditUser.onFalse}
        maxWidth="md" />
    </DashboardContent >
  );
}

// ----------------------------------------------------------------------

export function useTable() {
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState('name');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const onSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    },
    [order, orderBy]
  );

  const onSelectAllRows = useCallback((checked: boolean, newSelecteds: string[]) => {
    if (checked) {
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }, []);

  const onSelectRow = useCallback(
    (inputValue: string) => {
      const newSelected = selected.includes(inputValue)
        ? selected.filter((value) => value !== inputValue)
        : [...selected, inputValue];

      setSelected(newSelected);
    },
    [selected]
  );

  const onResetPage = useCallback(() => {
    setPage(0);
  }, []);

  const onChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      onResetPage();
    },
    [onResetPage]
  );

  return {
    page,
    order,
    onSort,
    orderBy,
    selected,
    rowsPerPage,
    onSelectRow,
    onResetPage,
    onChangePage,
    onSelectAllRows,
    onChangeRowsPerPage,
  };
}
