import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppBar, Avatar, Box, Button, Divider, IconButton, List, ListItem, ListItemButton, Toolbar } from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MenuIcon from '@mui/icons-material/Menu';
import MobileHeader from './MobileHeader';
import ASSESTS from '../../assests/index';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import {logoutStatus } from '../../store/features/Authentication/authSlice';
import { useLogoutMutation } from '../../store/features/Authentication/authApi';

const Header = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [logout , {error,isLoading}] = useLogoutMutation();

    const { isAuthenticated, name } = useSelector((state: RootState) => {
        return state.auth
    })

    console.log(isAuthenticated)

    const navitems = [
        { name: 'Home', path: '/home' },
        { name: 'My Tickets', path: '/my-tickets' },
        { name: 'TIX ID News', path: '/news' }
    ];

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async() => {
        try{
            await logout().unwrap();
            dispatch(logoutStatus());
        }catch(err){
            console.log("Login Response:",err)
        }
    }

    return (
        <AppBar component='nav' elevation={0} sx={{ maxWidth: '100%', padding: '8px 72px' }}>
            <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box component='img' src={ASSESTS.images.logo} alt='TIX ID Website' sx={{ width: 64, height: 32 }} />

                {/* Full view menu list */}
                <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 3 }}>
                    <List sx={{ display: 'flex', gap: 3 }}>
                        {navitems.map((item) => (
                            <ListItem key={item.name} disablePadding sx={{ width: 'auto' }}>
                                <ListItemButton sx={{
                                    padding: '0px 12px',
                                    borderBottom: '2px solid transparent',
                                    transition: 'all 0.1s ease-in-out',
                                    '&:hover': {
                                        bgcolor: 'primary.main',
                                        borderBottom: '2px solid rgb(0,0,0)',
                                        paddingBottom: '0px',
                                        transform: 'translateY(-2px)'
                                    }
                                }}>
                                    <NavLink
                                        to={item.path}
                                        style={({ isActive }) => ({
                                            textDecoration: 'none',
                                            color: isActive ? 'rgba(17, 142, 234, 1)' : 'inherit',
                                            borderBottom: isActive ? '2px solid rgba(17, 142, 234, 1)' : '2px solid transparent',
                                            transition: 'border-bottom 0.2s ease-in-out',
                                            fontSize: '18px'
                                        })}
                                    >
                                        {item.name}
                                    </NavLink>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    {!isAuthenticated &&
                        <Divider orientation='vertical'
                        variant='middle'
                        flexItem/>}
                    <IconButton color='inherit'>
                        <NotificationsNoneIcon />
                    </IconButton>
                    {/* Login and Signup Buttons */}
                    {!isAuthenticated && (
                        <><Button
                            sx={{
                                border: 'none',
                                fontSize: '18px',
                                color: 'grey.900',
                                padding: 0
                            }}
                            onClick={() => navigate('/register')}>
                            Register Account
                        </Button>
                            <Button
                                variant='contained'
                                sx={{
                                    bgcolor: 'royalblue.main',
                                    color: 'rgba(255, 190, 0, 1)',
                                    fontSize: '18px',
                                    padding: '2px 8px',
                                    boxShadow:'none'
                                }}
                                onClick={() => navigate('/login')}>
                                login
                            </Button></>)}
                    {/* Profile Icon */}
                    {isAuthenticated && <Avatar
                        sx={{
                            background: 'linear-gradient(to right,rgba(242, 196, 111, 1),rgba(198, 148, 63, 1))',
                            textTransform: 'uppercase'
                        }}>{name[0]}</Avatar>}

                    {isAuthenticated && <Button
                        variant='outlined'
                        sx={{
                            color: 'grey.800',
                            fontSize: '16px',
                            padding: '2px 8px',
                            border:'1px solid',
                            borderColor:'grey.500'
                        }}
                        onClick={handleLogout}>
                        logout
                    </Button>}
                </Box>

                {/* Mobile view hamburger menu */}
                <IconButton color='inherit' onClick={handleDrawerToggle} sx={{ display: { xs: 'block', sm: 'none' } }}>
                    <MenuIcon />
                </IconButton>

                {/* Mobile Drawer Component */}
                <MobileHeader mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} navitems={navitems} />
            </Toolbar>
        </AppBar>
    );
};

export default Header;
