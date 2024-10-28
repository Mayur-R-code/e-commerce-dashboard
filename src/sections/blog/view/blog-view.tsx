import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import { CircularProgress } from '@mui/material';
import Typography from '@mui/material/Typography';

import { _posts } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

import { TableNoData } from 'src/sections/user/table-no-data';
import { applyFilter, getComparator } from 'src/sections/user/utils';

import { PostItem } from '../post-item';
import { PostSearch } from '../post-search';

// ----------------------------------------------------------------------

export function BlogView() {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sortBy, setSortBy] = useState('latest');
  const [filterName, setFilterName] = useState('');
  const [seeMore, setSeeMore] = useState(3)
  const [loader, setLoader] = useState(false)

  const dataFiltered: any = applyFilter({
    inputData: _posts,
    comparator: getComparator('asc', 'desc'),
    filterName,
    name: 'title',
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSort = useCallback((newSort: string) => {
    setSortBy(newSort);
  }, []);

  // function to apply blog filter
  const handleFilterChange: (value: any) => void = useCallback((value: any) => {
    setFilterName(value?.title || '');
  }, []);

  // function to clear filter
  const handleClearFilter = useCallback(() => {
    setFilterName('');
  }, [])

  // function to handle see more button click
  const handleSeeMore = useCallback(() => {
    setLoader(true)
    setTimeout(() => {
      setLoader(false)
      setSeeMore((prev) => prev + 4)
    }, 900)
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

      <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap" sx={{ mb: 5 }}>
        <PostSearch posts={_posts} onFilterChange={handleFilterChange} onClearFilter={handleClearFilter} filterName={filterName} />
        {filterName && <Button color='error' startIcon={<Iconify icon="solar:trash-bin-2-bold" />} onClick={handleClearFilter} > Clear All</Button>}
      </Box>

      <Grid container spacing={3}>
        {dataFiltered?.slice(0, seeMore)?.map((post: any, index: number) => {
          const latestPostLarge = index === 0;
          const latestPost = index === 1 || index === 2;

          return (
            <>
              {dataFiltered?.length === 0 && <TableNoData searchQuery={filterName} sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }} />
              }
              <Grid key={post.id} xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}>
                <PostItem post={post} latestPost={latestPost} latestPostLarge={latestPostLarge} />
              </Grid>
            </>
          );
        })}
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 2 }}>
          {loader && <CircularProgress />}
        </Box>
      </Grid>
      {(dataFiltered?.length > seeMore && !loader )&& <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 3 }}>
        <Button variant='contained' onClick={handleSeeMore}>See More</Button>
      </Box>}
    </DashboardContent>
  );
}
