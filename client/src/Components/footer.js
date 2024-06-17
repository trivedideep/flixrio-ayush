import React from "react";
import "./footer.css";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Feedback from "../Pages/Feedback.js";
import { openSignin } from "../redux/setSigninSlice";
import useSession from '../hooks/useSession';
import { useDispatch } from "react-redux";

const FooterWrapper = styled.div`
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  width: 100%;
  box-sizing: border-box;
  text-align: center;
  padding: 15px 0;
  border-radius: 10px;
`;

const FooterComponent = () => {
  const dispatch = useDispatch();
  const [isFeedbackPopupOpen, setIsFeedbackPopupOpen] = useState(false); // State for popup visibility
  const { user } = useSession();

  const handleFeedbackClick = () => {
    if (!user) {
      // If not logged in, navigate to login page
      dispatch(openSignin());
      return;
  } else {
    setIsFeedbackPopupOpen(true);
  }
    
  };

  return (
    <div>
      <FooterWrapper style={{ bottom: "0" }}>
        <p>
          &copy; 2024 Made with <strong>Flixrio</strong> | &nbsp;
          <strong>
            <a onClick={handleFeedbackClick} style={{ cursor: "pointer", textDecoration: "none" }}>
              Feedback
            </a>
          </strong>
        </p>
      </FooterWrapper>
      {isFeedbackPopupOpen && (
        <Feedback setFeedbackopen={setIsFeedbackPopupOpen} Feedbackopen={isFeedbackPopupOpen} />
      )}
    </div>
  );
};

export default FooterComponent;