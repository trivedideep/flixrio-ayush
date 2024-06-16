import React from 'react';
import "./Feedback.css";
import styled from "styled-components";

const Container =styled.div`
display:flex;
justify-content:center;
align-items:center;
height:100%;
  background-color: #000000a7;

    
`;
const Wrapper=styled.div`
background-color: ${({ theme }) => theme.card};
    color: ${({ theme }) => theme.text_primary};
    border: 1px solid ${({ theme }) => theme.text_secondary};
     border-radius: 10px;
`;

const Feedback = () => {
    
    return (
        <Container>
     <Wrapper>
    <div class="rating-card">
  <div class="text-wrapper">
    <p class="text-primary">Please Rate Your Experience</p>
    <p class="text-secondary">to help us serve you better</p>
  </div>
  {/* <div>
    <textarea style={{backgroundColor:"#15171E" ,color:"white",border: "#cccccc" ,borderradius: "10px"}}></textarea>
</div> */}

  <div class="rating-stars-container">
    <input value="star-5" name="star" id="star-5" type="radio" />
    <label for="star-5" class="star-label">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
          pathLength="360"
        ></path>
      </svg>
    </label>
    <input value="star-4" name="star" id="star-4" type="radio" />
    <label for="star-4" class="star-label">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
          pathLength="360"
        ></path>
      </svg>
    </label>
    <input value="star-3" name="star" id="star-3" type="radio" />
    <label for="star-3" class="star-label">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
          pathLength="360"
        ></path>
      </svg>
    </label>
    <input value="star-2" name="star" id="star-2" type="radio" />
    <label for="star-2" class="star-label">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
          pathLength="360"
        ></path>
      </svg>
    </label>
    <input value="star-1" name="star" id="star-1" type="radio" />
    <label for="star-1" class="star-label">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
          pathLength="360"
        ></path>
      </svg>
    </label>
  </div>
  <div class="socials-container">
    <a class="social-button" href="#">
      <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"
        ></path>
      </svg>
    </a>
    <a class="social-button" href="#">
      <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
        ></path>
      </svg>
    </a>
    <a class="social-button" href="#">
      <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
        ></path>
      </svg>
    </a>
  </div>
</div>
 </Wrapper>
</Container>
  )
}

export default Feedback
