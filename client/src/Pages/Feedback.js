import React, { useEffect, useState } from "react";
import { CloseRounded } from "@mui/icons-material";
import { Modal } from "@mui/material";
import styled from "styled-components";
import axios from "axios";
import "./Feedback.css";
import { FrownOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons";
import { Rate, message } from "antd";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: top;
  justify-content: center;
  overflow-y: scroll;
`;
const Wrapper = styled.div`
  max-width: 500px;
  width: 100%;
  border-radius: 16px;
  margin: 50px 20px;
  height: min-content;
  background-color: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text_primary};
  padding: 10px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Desc = styled.textarea`
  width: 100%;
  border: none;
  font-size: 14px;
  border-radius: 3px;
  background-color: transparent;
  outline: none;
  padding: 10px 0px;
  color: ${({ theme }) => theme.text_secondary};
`;
const OutlinedBox = styled.div`
  min-height: 48px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  color: ${({ theme }) => theme.text_secondary};
  ${({ googleButton, theme }) =>
    googleButton &&
    `
    user-select: none; 
  gap: 16px;`}
  ${({ button, theme }) =>
    button &&
    `
    user-select: none; 
  border: none;
    font-weight: 600;
    font-size: 16px;
    background: ${theme.button};
    color:'${theme.bg}';`}
    ${({ activeButton, theme }) =>
    activeButton &&
    `
    user-select: none; 
  border: none;
    background: ${theme.primary};
    color: white;`}
  margin: 3px 20px;
  font-weight: 600;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 14px;
`;

const Flex = styled.div`
  width: 100%;
  display: flex;
  gap: 6px;
`;
const Title = styled.div`
  font-size: 22px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
  margin: 12px 20px;
`;
const SubTitle = styled.div`
  font-size: 15px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary};
  margin: 0px 20px;
`;
const customIcons = {
  1: <FrownOutlined />,
  2: <FrownOutlined />,
  3: <MehOutlined />,
  4: <SmileOutlined />,
  5: <SmileOutlined />,
};

const Feedback = ({ Feedbackopen, setFeedbackopen }) => {
  const user_data = JSON.parse(localStorage.getItem("loginuser"));
  const [feed, setfeed] = React.useState({
    feedback: "",
    rate: "",
    u_id: user_data ? user_data.id : 0,
  });
  const [disabled] = React.useState(true);

  const handleSubmit = (event) => {
    axios.post("http://localhost:8080/feedback_insert", feed)
      .then((res) => {
        if (res.status === 200) {
          message.success("Thank you for youe valuable Feedback");
          setFeedbackopen(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [CurrentRate,setCurrentRate] = useState(feed.rate || 0); // Set initial rate based on podcast.rate or default to 0

  const handleChange = (value) => {
    setCurrentRate(value);
    setfeed({ ...feed, rate: value });
  };

  useEffect(() => {}, []);

  return (
    <Modal
      open={Feedbackopen}
      onClose={() => setFeedbackopen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Container>
        <Wrapper>
          <CloseRounded
            style={{
              position: "absolute",
              top: "24px",
              right: "30px",
              cursor: "pointer",
            }}
            onClick={() => setFeedbackopen(false)}
          />
          <Title className="text-primary">Please Rate Your Experience</Title>
          <SubTitle>to help us serve you better</SubTitle>
          <OutlinedBox style={{ marginTop: "30px", padding: "10px",  }}>
            <Rate
              defaultValue={0}
              character={({ index = 0 }) => customIcons[index + 1]}
              onChange={handleChange}
              style={{color:"rgb(255, 102, 47)"}}
            />
          </OutlinedBox>

          <OutlinedBox style={{ marginTop: "15px" }}>
            <Desc
              placeholder="Enter your feedback.... "
              name="feedback"
              rows={5}
              onChange={(e) => setfeed({ ...feed, feedback: e.target.value })}
            />
          </OutlinedBox>
          <OutlinedBox
            button={true}
            activeButton={disabled}
            style={{ marginTop: "22px", marginBottom: "18px" }}
            onClick={handleSubmit}
          >
            Submit
          </OutlinedBox>
          <div class="socials-container">
            <a class="social-button" href="#">
              <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"></path>
              </svg>
            </a>
            <a class="social-button" href="#">
              <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
              </svg>
            </a>
            <a class="social-button" href="#">
              <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path>
              </svg>
            </a>
          </div>
        </Wrapper>
      </Container>
    </Modal>
  );
};

export default Feedback;
