import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PodcastCard from "../Components/PodcastCard";
import axios from "axios";

const DashboardMain = styled.div`
  padding: 20px 30px;

  height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (max-width: 768px) {
    padding: 6px 10px;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bg};
  border-radius: 10px;
  padding: 20px 30px;
`;

const Topic = styled.div`
  color: ${({ theme }) => theme.text_primary};
  font-size: 24px;
  font-weight: 540;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const Podcasts = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  padding: 18px 6px;
  @media (max-width: 550px) {
    justify-content: center;
  }
`;

const Myvid = () => {
  const [videos, setVideos] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const user_data = JSON.parse(localStorage.getItem("loginuser"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const u_id = user_data ? user_data.id : 0;
        const response = await axios.put(
          `http://localhost:8080/myvid/${u_id}`,
          {
            withCredentials: true, // Ensure cookies are sent
          }
        );
        if (response.status === 200) {
          setVideos(response.data.data);
        } else {
          setVideos(null);
        }
      } catch (error) {
        console.error("Error fetching session:", error);
        setVideos(null);
      }
    };

    fetchData();
  }, [user_data]);

  return (
    <DashboardMain>
      <FilterContainer>
        <Topic>My Videos</Topic>
        <Podcasts>
          {videos &&
            videos.map((video) => (
              <PodcastCard
                key={video.id}
                podcast={video}
                user={user}
                setUser={setUser}
                showDeleteButton={true}
              />
            ))}
        </Podcasts>
      </FilterContainer>
    </DashboardMain>
  );
};

export default Myvid;
