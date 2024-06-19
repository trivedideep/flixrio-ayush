import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import PodcastCard from "../Components/PodcastCard";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/favSlice";

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
const Dashboard = () => {
  const [videos, setVideos] = useState(null);
  const [videos1, setVideos1] = useState(null);
  const { userFav } = useSelector((state) => state.fav);
  const dispatch = useDispatch();
  const user_data = JSON.parse(localStorage.getItem("loginuser"));

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/vid", {
        withCredentials: true, // Ensure cookies are sent
      });

      if (response.status === 200) {
        setVideos(response.data);
      } else {
        setVideos(null);
      }
    } catch (error) {
      console.error("Error fetching session:", error);
      setVideos(null);
    }
  };
  const fetchData_sec2 = async () => {
    try {
      const response = await axios.get("http://localhost:8080/vid2", {
        withCredentials: true, // Ensure cookies are sent
      });

      if (response.status === 200) {
        setVideos1(response.data);
      } else {
        setVideos(null);
      }
    } catch (error) {
      console.error("Error fetching session:", error);
      setVideos1(null);
    }
  };

  const fetchData_fav = async () => {
    try {
      const u_id = user_data ? user_data.id : 0;
      const response = await axios.put(
        `http://localhost:8080/fatchfavouritedata/${u_id}`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        const updatedUser = { ...userFav, favorites: response.data.data };
        if (
          JSON.stringify(userFav.favorites) !==
          JSON.stringify(updatedUser.favorites)
        ) {
          dispatch(setUser(updatedUser));
          localStorage.setItem("user", JSON.stringify(updatedUser));
        }
      }
    } catch (error) {
      console.error("Error fetching session:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchData_sec2();
  }, []);

  useEffect(() => {
    if (user_data !== null) {
      fetchData_fav();
    }
    console.log(userFav, "user");
    console.log("Login User:");
    console.log(user_data);
  }, [user_data]);

  return (
    <DashboardMain>
      <FilterContainer>
        <Topic>
          Most Popular
          <Link to={`/Showall`} style={{ textDecoration: "none" }}>
            <Span>Show All</Span>
          </Link>
        </Topic>
        <Podcasts>
          {videos &&
            videos.map((video) => (
              <PodcastCard key={video.id} podcast={video} user={userFav} />
            ))}
        </Podcasts>
      </FilterContainer>

      <FilterContainer>
        <Topic>
          Recent uploads
          <Link to={`/Showallre`} style={{ textDecoration: "none" }}>
            <Span>Show All</Span>
          </Link>
        </Topic>
        <Podcasts>
          {videos1 &&
            videos1.map((video) => (
              <PodcastCard key={video.id} podcast={video} user={userFav} />
            ))}
        </Podcasts>
      </FilterContainer>
    </DashboardMain>
  );
};

export default Dashboard;
