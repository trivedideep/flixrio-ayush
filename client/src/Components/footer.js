import React from "react";
import "./footer.css";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  return (
    <div>
      <FooterWrapper style={{ bottom: "0" }}>
        <p>
          &copy; 2024 Made with <strong>Flixrio</strong> | &nbsp;
          <strong>
            <a onClick={() => navigate("/feedback")} style={{ cursor: 'pointer', textDecoration: 'none' }}>Feedback</a>
          </strong>
        </p>
      </FooterWrapper>
    </div>
  );
};

export default FooterComponent;
