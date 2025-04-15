import { ConfirmationNumberOutlined, ReceiptLongOutlined } from '@mui/icons-material';
import { Box, Container } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router';

const Sidebar = () => {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        bgcolor: '#f5f5f5',
        color: 'secondary.main',
        padding: 2,
        paddingTop: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '10px',
        overflowX: 'hidden',
        position: 'relative', 
        height: '100vh', 
        width: '250px', 
        borderRight: '2px solid rgba(218, 223, 232, 1)', 
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, width: '100%' }}>
        <NavLink
          to="/my-tickets/active-ticket"
          style={({ isActive }) => ({
            textDecoration: 'none',
            color: isActive ? 'rgba(17, 142, 234, 1)' : 'inherit',
            borderBottom: '1px solid rgba(218, 223, 232, 1)',
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            padding: '10px 15px',
            gap: '8px',
          })}
        >
          <ConfirmationNumberOutlined sx={{ color: 'inherit' }} />
          Active Ticket
        </NavLink>
        <NavLink
          to="/my-tickets/transaction-list"
          style={({ isActive }) => ({
            textDecoration: 'none',
            color: isActive ? 'rgba(17, 142, 234, 1)' : 'inherit',
            borderBottom: '1px solid rgba(218, 223, 232, 1)',
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            padding: '10px 15px',
            gap: '8px',
          })}
        >
          <ReceiptLongOutlined sx={{ color: 'inherit' }} />
          Transaction List
        </NavLink>
      </Box>
    </Container>
  );
};

export default Sidebar;
