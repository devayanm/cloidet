import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Box,
  TextField,
  Avatar,
  Divider,
} from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import { useAuth } from '../../hooks/useAuth'; 

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [profileMenuAnchorEl, setProfileMenuAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const profileMenuOpen = Boolean(profileMenuAnchorEl);
  const location = useLocation();
  const navigate = useNavigate(); 

  const { logout } = useAuth(); 

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileMenuClick = (event) => {
    setProfileMenuAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/'); 
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const currentPath = location.pathname;

  return (
    <AppBar position="static" sx={{ boxShadow: 0, backgroundColor: theme.palette.primary.main }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, color: theme.palette.primary.contrastText }}>
          Cloidet
        </Typography>
        {isMobile ? (
          <>
            <IconButton edge="end" color="inherit" aria-label="menu" onClick={handleMenuClick}>
              <MenuIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
              <MenuItem component={Link} to="/dashboard" onClick={handleMenuClose} selected={currentPath === '/dashboard'}>
                Dashboard
              </MenuItem>
              <MenuItem component={Link} to="/ide" onClick={handleMenuClose} selected={currentPath === '/ide'}>
                IDE
              </MenuItem>
              <MenuItem component={Link} to="/profile" onClick={handleMenuClose} selected={currentPath === '/profile'}>
                Profile
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Button color="inherit" component={Link} to="/dashboard" sx={{ mx: 1, color: theme.palette.primary.contrastText }} selected={currentPath === '/dashboard'}>
              Dashboard
            </Button>
            <Button color="inherit" component={Link} to="/ide" sx={{ mx: 1, color: theme.palette.primary.contrastText }} selected={currentPath === '/ide'}>
              IDE
            </Button>
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
              <TextField
                variant="outlined"
                placeholder="Search..."
                size="small"
                InputProps={{
                  endAdornment: <SearchIcon />,
                }}
                sx={{ mx: 2, width: '300px' }}
              />
            </Box>
            <IconButton color="inherit" aria-label="notifications">
              <NotificationsIcon />
            </IconButton>
            <IconButton color="inherit" aria-label="settings">
              <SettingsIcon />
            </IconButton>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="profile"
              onClick={handleProfileMenuClick}
              sx={{ ml: 2 }}
            >
              <Avatar alt="Profile" src="/profile-picture.jpg" />
            </IconButton>
            <Menu
              anchorEl={profileMenuAnchorEl}
              open={profileMenuOpen}
              onClose={handleProfileMenuClose}
              sx={{ mt: 2 }}
            >
              <MenuItem component={Link} to="/profile" onClick={handleProfileMenuClose}>
                Profile
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
