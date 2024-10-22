import React from 'react';

import { styled } from '@mui/material';

export type CustomScrollbarProps = {
    children: React.ReactNode;
    maxHeight?: string;
};
const CustomScrollbar = ({ children, maxHeight }: CustomScrollbarProps) => {
    const CustomScrollbarWrapper = styled('div')({
        maxHeight: maxHeight || '50vh', // Set a maximum height for the view
        overflowY: 'hidden', // Initially hide the scrollbar
        '&:hover': {
            overflowY: 'auto', // Show the scrollbar on hover
        },
        '&::-webkit-scrollbar': {
            width: '0.4rem',
        },
        '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#888',
            borderRadius: '10px',
            cursor: 'pointer',
        },
    });

    return <CustomScrollbarWrapper>{children}</CustomScrollbarWrapper>;
};

export default CustomScrollbar;
