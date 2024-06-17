import React from "react";
import "./footer.css";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Footer = styled.div`
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};

  width: 100%;
  box-sizing: border-box;
  text-align: center;
  padding: 15px 0;
  border-radius: 10px;
`;

function footer() {
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <Footer style={{ bottom: "0" }}>
          <p>
            &copy 2024 Made with <strong>Flixrio</strong> |
            <strong ><a onClick={() =>navigate("/feedback")}>FeedBack</a></strong>
          </p>
        </Footer>
      </div>
    </div>
  );
}

export default footer;
