import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { logoutStatus } from '../../store/features/Authentication/authSlice';
import { useLogoutMutation } from '../../store/features/Authentication/authApi';

interface MobileHeaderProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  navitems: { name: string; path: string }[];
}

const MobileHeader: React.FC<MobileHeaderProps> = ({
  mobileOpen,
  handleDrawerToggle,
  navitems,
}) => {
  const { isAuthenticated, name } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout, { error, isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(logoutStatus());
      handleDrawerToggle(); // Close drawer after logout
    } catch (err) {
      console.log("Logout Response:", err)
    }
  };

  return (
    <Drawer
      anchor="right"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      PaperProps={{
        sx: {
          width: 250,
          padding: '16px',
          position: 'fixed',
          height: '100%',
          right: 0,
          left: 'auto',
        },
      }}
    >
      {/* Drawer Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" fontWeight="bold">
          Menu
        </Typography>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Navigation Links */}
      <List>
        {navitems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton onClick={handleDrawerToggle}>
              <NavLink
                to={item.path}
                style={({ isActive }) => ({
                  textDecoration: 'none',
                  color: isActive ? 'rgba(17, 142, 234, 1)' : 'inherit',
                  fontWeight: isActive ? 'bold' : 'normal',
                  width: '100%',
                })}
              >
                {item.name}
              </NavLink>
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      {/* Show Login/Register if NOT authenticated */}
      {!isAuthenticated ? (
        <Box display="flex" flexDirection="column" gap={1} alignItems="center">
          <Button
            sx={{
              width: '100%',
              fontSize: '16px',
              color: 'grey.900',
              textTransform: 'none',
            }}
            onClick={() => {
              navigate('/register');
              handleDrawerToggle();
            }}
          >
            Register Account
          </Button>

          <Button
            variant="contained"
            sx={{
              width: '100%',
              bgcolor: 'royalblue.main',
              color: 'rgba(255, 190, 0, 1)',
              fontSize: '16px',
              boxShadow: 'none',
              textTransform: 'none',
            }}
            onClick={() => {
              navigate('/login');
              handleDrawerToggle();
            }}
          >
            Login
          </Button>
        </Box>
      ) : (
        // Show Profile + Logout if Authenticated
        <Box
          sx={{
            position: 'absolute',
            bottom: 16,
            left: 16,
            right: 16,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: 'calc(100% - 32px)',
          }}
        >
          {/* Avatar on Bottom-Left */}
          <Avatar
            sx={{
              width: 40,
              height: 40,
              background: 'linear-gradient(to right, rgba(242, 196, 111, 1), rgba(198, 148, 63, 1))',
              textTransform: 'uppercase',
              fontSize: '16px',
            }}
          >
            {name[0]}
          </Avatar>

          {/* User Name on Bottom-Right */}
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{
              fontSize: '16px', textAlign: 'right', color: 'grey.900',
              textTransform: 'capitalize'
            }}
          >
            {name}
          </Typography>
        </Box>
      )}

      {/* Logout Button (Remains in place) */}
      {isAuthenticated && (
        <Box display="flex" justifyContent="center" mt={3}>
          <Button
            variant="outlined"
            sx={{
              width: '100%',
              color: 'grey.800',
              borderColor: 'grey.500',
              fontSize: '16px',
              textTransform: 'none',
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      )}
    </Drawer>
  );
};

export default MobileHeader;
