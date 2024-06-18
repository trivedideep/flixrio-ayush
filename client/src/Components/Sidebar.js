import React from "react";
import styled from "styled-components";
import { CloseRounded, HomeRounded, LogoutRounded } from "@mui/icons-material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import FeedbackRoundedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import LogoImage from "../Images/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import BackupRoundedIcon from "@mui/icons-material/BackupRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import { useDispatch } from "react-redux";
import { openSignin } from "../redux/setSigninSlice";
import useSession from "../hooks/useSession";

const MenuContainer = styled.div`
  flex: 0.5;
  flex-direction: column;
  height: 100vh;
  display: flex;
  box-sizing: border-box;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 1100px) {
    position: fixed;
    z-index: 1000;
    width: 100%;
    max-width: 250px;
    left: ${({ setMenuOpen }) => (setMenuOpen ? "0" : "-100%")};
    transition: 0.3s ease-in-out;
  }
`;
const Flex = styled.div`
  justify-content: space-between;
  display: flex;
  align-items: center;
  padding: 0px 16px;
  width: 86%;
`;
const Logo = styled.div`
  color: ${({ theme }) => theme.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-weight: bold;
  font-size: 20px;
  margin: 16px 0px;
`;
const Image = styled.img`
  height: 40px;
`;
const Close = styled.div`
  display: none;
  @media (max-width: 1100px) {
    display: block;
  }
`;
const Elements = styled.div`
  padding: 4px 16px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  box-sizing: border-box;
  color: ${({ theme }) => theme.text_secondary};
  width: 100%;
  &:hover {
    background-color: ${({ theme }) => theme.text_secondary + 50};
  }
`;
const NavText = styled.div`
  padding: 12px 0px;
`;
const HR = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.text_secondary + 50};
  margin: 10px 0px;
`;

const Sidebar = ({
  setMenuOpen,
  darkMode,
  setDarkMode,
  setUploadOpen,
  setFeedbackopen,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, clearSession } = useSession();

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8080/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Ensure cookies are sent
      });
      if (response.ok) {
        clearSession(); // Update session state in your custom hook
        localStorage.removeItem("loginuser");
        navigate("/Dashboard"); // Redirect to home or login page
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleMenuClick = (path) => {
    // Check if user is logged in
    if (!user) {
      // If not logged in, navigate to login page
      dispatch(openSignin());
      return;
    } else {
      if (path === "/upload") {
        setUploadOpen(true);
      } else if (path === "/feedback") {
        setFeedbackopen(true);
      } else {
        // If logged in, handle navigation normally
        navigate(path);
      }
    }
  };

  return (
    <MenuContainer setMenuOpen={setMenuOpen}>
      <Flex>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Logo>
            <Image src={LogoImage} />
            FlixRio
          </Logo>
        </Link>
        <Close>
          <CloseRounded
            onClick={() => setMenuOpen(false)}
            style={{ cursor: "pointer" }}
          />
        </Close>
      </Flex>
      <Link
        to="/"
        style={{ textDecoration: "none", color: "inherit", width: "100%" }}
      >
        <Elements>
          <HomeRounded />
          <NavText>Dashboard</NavText>
        </Elements>
      </Link>
      <Link
        to="/search"
        style={{ textDecoration: "none", color: "inherit", width: "100%" }}
      >
        <Elements>
          <SearchRoundedIcon />
          <NavText>Search</NavText>
        </Elements>
      </Link>
      {/* <Link to='/favourites' style={{ textDecoration: "none", color: "inherit", width: '100%' }}>
                <Elements>
                    <FavoriteRoundedIcon />
                    <NavText>Favourites</NavText>
                </Elements>
            </Link>
            <HR />
            {/* <Elements onClick={() => setUploadOpen(true)} style={{ textDecoration: "none", color: "inherit", width: '100%' }}> */}
      {/* Upload button */}
      <Elements
        onClick={() => handleMenuClick("/favourites")}
        style={{ textDecoration: "none", color: "inherit", width: "100%" }}
      >
        <FavoriteRoundedIcon />
        <NavText>Favourites</NavText>
      </Elements>
      <HR />
      {/* Upload button */}
      <Elements
        onClick={() => handleMenuClick("/upload")}
        style={{ textDecoration: "none", color: "inherit", width: "100%" }}
      >
        <BackupRoundedIcon />
        <NavText>Upload</NavText>
      </Elements>
      {darkMode ? (
        <Elements onClick={() => setDarkMode(false)}>
          <LightModeRoundedIcon />
          <NavText>Light Mode</NavText>
        </Elements>
      ) : (
        <Elements onClick={() => setDarkMode(true)}>
          <DarkModeRoundedIcon />
          <NavText>Dark Mode</NavText>
        </Elements>
      )}
      {/* <Elements onClick={handleLogout} style={{ textDecoration: "none", color: "inherit", width: '100%' }}>
                <LogoutRounded />
                <NavText>Log Out</NavText>
            </Elements> */}
      {/* <Elements onClick={() => handleMenuClick('/feedback')} style={{ textDecoration: "none", color: "inherit", width: '100%' }}>
                <FeedbackRoundedIcon />
                <NavText>Feedback</NavText>
            </Elements> */}
      <Elements
        onClick={() => handleMenuClick("/feedback")}
        style={{ textDecoration: "none", color: "inherit", width: "100%" }}
      >
        <BackupRoundedIcon />
        <NavText>Feedback</NavText>
      </Elements>
    </MenuContainer>
  );
};

export default Sidebar;
