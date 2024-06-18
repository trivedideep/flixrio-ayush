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
const Span = styled.div`
  color: ${({ theme }) => theme.primary};
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;
const Podcasts = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  padding: 18px 6px;
  //center the items if only one item present
  @media (max-width: 550px) {
    justify-content: center;
  }
`;
const Showall = () => {
  const [videos, setVideos] = useState(null);
  const [setVideos1] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/vid1", {
          withCredentials: true, // Ensure cookies are sent
        });

        if (response.status === 200) {
          setVideos(response.data);
          setVideos1(response.data);
        } else {
          setVideos(null);
        }
      } catch (error) {
        console.error("Error fetching session:", error);
        setVideos(null);
        setVideos1(null);
      }
    };

    fetchData();
  }, []);

  return (
    <DashboardMain>
      <FilterContainer>
        <Topic>Most Popular</Topic>
        <Podcasts>
          {videos &&
            videos.map((video) => (
              <PodcastCard
                key={video.id}
                podcast={video}
                user={user}
                setUser={setUser}
              />
            ))}
        </Podcasts>
      </FilterContainer>
    </DashboardMain>
  );
};

export default Showall;
