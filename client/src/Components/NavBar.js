import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import { IconButton } from "@mui/material";
import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { openSignin } from "../redux/setSigninSlice";
import useSession from '../hooks/useSession';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';
import Menu from '@mui/material/Menu';
import Logout from '@mui/icons-material/Logout';
import Settings from '@mui/icons-material/Settings';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Divider from '@mui/material/Divider';
import { setUser } from "../redux/favSlice";


const NavBarDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 16px 40px;
  align-items: center;
  box-sizing: border-box;
  color: ${({ theme }) => theme.text_primary};
  gap: 30px;
  background: ${({ theme }) => theme.bg};
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5.7px);
  -webkit-backdrop-filter: blur(5.7px);
  @media (max-width: 768px) {
    padding: 16px;
  }
`;
const ButtonDiv = styled.div`
  font-size: 14px;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.primary};
  border: 1px solid ${({ theme }) => theme.primary};
  border-radius: 12px;
  width: 100%;
  max-width: 70px;
  padding: 8px 10px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  &:hover {
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text_primary};
  }
`;
const IcoButton = styled(IconButton)`
  color: ${({ theme }) => theme.text_secondary} !important;
  
`;
const Welcome = styled.div`
  font-size: 26px;
  font-weight: 600;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;



const NavBar = ({ menuOpen, setMenuOpen }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, fetchSession } = useSession();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  localStorage.setItem('loginuser', JSON.stringify(user));

  useEffect(() => {
    fetchSession();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handlemyvid = () => {
    // Your logic for handling close can go here

    // Navigate to a different page
    navigate('/Myvid'); // Change '/about' to the path you want to navigate to
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    handleClose();
    try {
        const response = await fetch('http://localhost:8080/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include' // Ensure cookies are sent
        });
      if (response.ok) {
        fetchSession();
        localStorage.clear();
        dispatch(setUser(null))

            navigate('/'); // Redirect to home or login page
        } else {
            console.error('Logout failed');
        }
    } catch (error) {
        console.error('Error logging out:', error);
    }
  };
  
  return (
    <NavBarDiv>
      <IcoButton onClick={() => setMenuOpen(!menuOpen)}>
        <MenuIcon />
      </IcoButton>
      {user ?
        <Welcome>
          Welcome, {user.name}
        </Welcome>
        :
        <>&nbsp;</>}
      {
        user ? <>
          <Link onClick={handleClick} style={{ textDecoration: 'none' }}>
            <Avatar src={user.img} >{user.name.charAt(0).toUpperCase()}</Avatar>
          </Link>
        </>
          :
          <ButtonDiv onClick={() => dispatch(openSignin())}>
            <PersonIcon style={{ fontSize: "18px" }} />
            Login
          </ButtonDiv>
      }
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={()=>navigate("/profile") }>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={handlemyvid}>
          <Avatar /> My video
        </MenuItem>
        <Divider />
        {/* <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem> */}
        {/* <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem> */}
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </NavBarDiv>
  );
};

export default NavBar;
