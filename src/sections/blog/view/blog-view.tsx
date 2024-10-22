import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';

import { _posts } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

import { TableNoData } from 'src/sections/user/table-no-data';
import { applyFilter, getComparator } from 'src/sections/user/utils';

import { PostSort } from '../post-sort';
import { PostItem } from '../post-item';
import { PostSearch } from '../post-search';

// ----------------------------------------------------------------------

export function BlogView() {
  const [sortBy, setSortBy] = useState('latest');
  const [filterName, setFilterName] = useState('');

  const dataFiltered: any = applyFilter({
    inputData: _posts,
    comparator: getComparator('asc', 'desc'),
    filterName,
    name: 'title',
  });
  
  const handleSort = useCallback((newSort: string) => {
    setSortBy(newSort);
  }, []);

  // function to apply blog filter
  const handleFilterChange: (value: any) => void = useCallback((value: any) => {
    setFilterName(value?.title || '');
  }, []);

  const handleClearFilter = useCallback(() => {
    setFilterName('');
  }, [])

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Blog
        </Typography>
        <Button
          variant="outlined"
          // color="inherit"
          startIcon={<Iconify icon="solar:add-square-bold" />}
        >
          New post
        </Button>
      </Box>

      <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: 5 }}>
        <PostSearch posts={_posts} onFilterChange={handleFilterChange} onClearFilter={handleClearFilter} filterName={filterName} />

        <PostSort
          sortBy={sortBy}
          onSort={handleSort}
          options={[
            { value: 'latest', label: 'Latest' },
            { value: 'popular', label: 'Popular' },
            { value: 'oldest', label: 'Oldest' },
          ]}
        />
      </Box>

      <Grid container spacing={3}>
        {dataFiltered.map((post: any, index: number) => {
          const latestPostLarge = index === 0;
          const latestPost = index === 1 || index === 2;

          return (
            <>
              {dataFiltered.length === 0 && <TableNoData searchQuery={filterName} sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }} />
              }
              <Grid key={post.id} xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}>
                <PostItem post={post} latestPost={latestPost} latestPostLarge={latestPostLarge} />
              </Grid>

            </>
          );
        })}
      </Grid>
      <Pagination count={10} color="primary" sx={{ mt: 8, mx: 'auto' }} />
    </DashboardContent>
  );
}
