import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import { DefaultCard } from "../Components/DefaultCard.jsx";
import PodcastCard from "../Components/PodcastCard";
import axios from "axios";

const SearchMain = styled.div`
  padding: 20px 30px;

  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (max-width: 768px) {
    padding: 20px 9px;
  }
`;
const Search_whole = styled.div`
  max-width: 700px;
  display: flex;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  border-radius: 30px;
  cursor: pointer;
  padding: 12px 16px;
  justify-content: flex-start;
  align-items: center;
  gap: 6px;
  color: ${({ theme }) => theme.text_secondary};
`;
const Heading = styled.div`
  align-items: flex-start;
  color: ${({ theme }) => theme.text_primary};
  font-size: 22px;
  font-weight: 540;
  margin: 10px 14px;
`;
const BrowseAll = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 14px;
`;
const Categories = styled.div`
  margin: 20px 10px;
`;
const OtherResults = styled.div`
  display: flex;
  flex-direction: column;
  height: 700px;
  overflow-y: scroll;
  overflow-x: hidden;
  gap: 6px;
  padding: 4px 4px;
  @media (max-width: 768px) {
    height: 100%;
    padding: 4px 0px;
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
const DivPodcasts = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  padding: 18px 6px;
  //center the items if only one item present
  @media (max-width: 550px) {
    justify-content: center;
  }
`;

const Search = () => {
  const [filterCategories, setFilterCategories] = useState([]);

  const [user, setUser] = useState(false);
  const [Category, setCategory] = useState([]);
  const [videos, setVideos] = useState(null);

  const filterCategory = async (value) => {
    if (value.trim().length === 0) {
      setFilterCategories(Category);
    } else {
      setFilterCategories(
        Category.filter((cat) => cat.name.toLowerCase().includes(value))
      );
    }

    try {
      const response = await axios.get("http://localhost:8080/search_vid", {
        params: { search_data: value },
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

  const fetchSession = async () => {
    try {
      const response = await axios.get("http://localhost:8080/session", {
        withCredentials: true, // Ensure cookies are sent
      });
      if (response.status === 200) {
        const data = response.data;
        console.log(data.user); // Access session user data
        // Handle session user data (e.g., set state)
      } else {
        console.log("User not logged in");
      }
    } catch (error) {
      console.error("Error fetching session:", error);
    }
  };

  useEffect(() => {
    // Fetch session data when the component mounts

    fetchSession();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/cat", {
          withCredentials: true, // Ensure cookies are sent
        });
        if (response.status === 200) {
          setCategory(response.data);
          setFilterCategories(response.data);
        } else {
          setCategory(null);
        }
      } catch (error) {
        console.error("Error fetching session:", error);
        setCategory(null);
      }
    };

    fetchData();
  }, []);

  return (
    <SearchMain>
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <Search_whole>
          <SearchOutlinedIcon sx={{ color: "inherit" }} />
          <input
            type="text"
            placeholder="Search Artist/Podcast"
            style={{
              border: "none",
              outline: "none",
              width: "100%",
              background: "inherit",
              color: "inherit",
            }}
            onChange={(e) => filterCategory(e.target.value)}
          />
        </Search_whole>
      </div>
      <Categories>
        <Heading>Browse All</Heading>
        <BrowseAll>
          {filterCategories.map((category) => (
            <Link
              to={`/Showpodcasts/${category.c_id}`}
              style={{ textDecoration: "none" }}
              key={category.c_id}
            >
              <DefaultCard category={category} />
            </Link>
          ))}
        </BrowseAll>
      </Categories>
      {videos && (
        <FilterContainer>
          <Topic>Videos</Topic>
          <DivPodcasts>
            {videos &&
              videos.map((video) => (
                <PodcastCard
                  key={video.id}
                  podcast={video}
                  user={user}
                  setUser={setUser}
                />
              ))}
          </DivPodcasts>
        </FilterContainer>
      )}
    </SearchMain>
  );
};

export default Search;
