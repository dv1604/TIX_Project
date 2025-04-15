import { Box, BottomNavigation, BottomNavigationAction, useMediaQuery, useTheme } from '@mui/material';
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Content from './Content';
import { ConfirmationNumberOutlined, ReceiptLongOutlined } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const MyTickets = () => {
    const theme = useTheme();
    const isLgUp = useMediaQuery(theme.breakpoints.up('lg'));
    const navigate = useNavigate();
    const location = useLocation();
    const [value, setValue] = useState(location.pathname);

    return (
        <Box
            sx={{
                display: 'flex',
                height: '90vh',
                flexDirection: isLgUp ? 'row' : 'column',
                overflow: 'hidden',
            }}
        >
            {/* Sidebar for lg and up */}
            {isLgUp && <Sidebar />}

            {/* Main Content Area */}
            <Box
                sx={{
                    flexGrow: 1,
                    height: '100%',
                    overflow: 'auto',
                    minWidth: 0,
                    scrollbarWidth: 'none',
                    '&::-webkit-scrollbar': { display: 'none' },
                    display: 'flex',
                    flexDirection: 'column',

                }}
            >
                {/* Content */}
                <Box sx={{ flexGrow: 1, padding: {xs:2,sm:3} }}>
                    <Content />
                </Box>

                {/* Bottom Navigation for xs to md (Only on MyTickets page) */}
                {!isLgUp && (
                    <BottomNavigation
                        showLabels
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                            navigate(newValue);
                        }}
                        sx={{
                            bgcolor: '#f5f5f5',
                            borderTop: '2px solid rgba(218, 223, 232, 1)',
                            width: '100%',
                            position: 'sticky',
                            bottom: 0,
                            zIndex: 10,
                            minHeight: 50, // Ensure minimum height
                            height: 'auto', // Allow it to expand if needed
                            paddingTop: 2, // Add some spacing
                            paddingBottom: 2, // Add some spacing // Increased height for better usability
                            '& .Mui-selected': {
                                color: 'rgba(17, 142, 234, 1) !important',
                            },
                        }}
                    >
                        <BottomNavigationAction
                            label="Active Ticket"
                            icon={<ConfirmationNumberOutlined />}
                            value="/my-tickets/active-ticket"
                        />
                        <BottomNavigationAction
                            label="Transaction List"
                            icon={<ReceiptLongOutlined />}
                            value="/my-tickets/transaction-list"
                        />
                    </BottomNavigation>
                )}
            </Box>
        </Box>
    );
};

export default MyTickets;
