import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton } from "@mui/material";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import DeleteIcon from "@mui/icons-material/Delete";
import { baseUrl } from "../api";
import VideoPlayer from "./VideoPlayer";
import axios from "axios";
import { message, Modal } from "antd";
import { useDispatch } from "react-redux";
import { openSignin } from "../redux/setSigninSlice";
import { setUser } from "../redux/favSlice";

const PlayIcon = styled.div`
  padding: 10px;
  border-radius: 50%;
  z-index: 100;
  display: flex;
  align-items: center;
  background: #9000ff !important;
  color: white !important;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  position: absolute !important;
  top: 45%;
  right: 10%;
  display: none;
  transition: all 0.4s ease-in-out;
  box-shadow: 0 0 16px 4px #9000ff50 !important;
`;

const Card = styled.div`
  position: relative;
  text-decoration: none;
  background-color: ${({ theme }) => theme.card};
  max-width: 220px;
  height: 280px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 16px;
  border-radius: 6px;
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.1);
  &:hover {
    cursor: pointer;
    transform: translateY(-8px);
    transition: all 0.4s ease-in-out;
    box-shadow: 0 0 18px 0 rgba(0, 0, 0, 0.3);
    filter: brightness(1.3);
  }
  &:hover ${PlayIcon} {
    display: flex;
  }
`;

const Top = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  position: relative;
`;

const Title = styled.div`
  overflow: hidden;
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.text_primary};
`;

const Description = styled.div`
  overflow: hidden;
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 12px;
`;

const CardImage = styled.img`
  object-fit: cover;
  width: 220px;
  height: 140px;
  border-radius: 6px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
  &:hover {
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.4);
  }
`;

const CardInformation = styled.div`
  display: flex;
  align-items: flex-end;
  font-weight: 450;
  padding: 14px 0px 0px 0px;
  width: 100%;
`;

const MainInfo = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  gap: 4px;
`;

const CreatorInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: 6px;
`;

const CreatorName = styled.div`
  font-size: 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.text_secondary};
`;

const Views = styled.div`
  font-size: 10px;
  color: ${({ theme }) => theme.text_secondary};
  width: max-content;
`;

const Favorite = styled(IconButton)`
  color: white;
  top: 8px;
  right: 6px;
  padding: 6px !important;
  border-radius: 50%;
  z-index: 100;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.text_secondary + 95} !important;
  color: white !important;
  position: absolute !important;
  backdrop-filter: blur(4px);
  box-shadow: 0 0 16px 6px #222423 !important;
`;

const DeleteButton = styled(IconButton)`
  color: white;
  top: 8px;
  right: 40px;
  padding: 6px !important;
  border-radius: 50%;
  z-index: 100;
  display: flex;
  align-items: center;
  background: #e8111195 !important;
  color: white !important;
  position: absolute !important;
  backdrop-filter: blur(4px);
  box-shadow: 0 0 16px 6px #222423 !important;
`;

const PodcastCard = ({ podcast, user, showDeleteButton }) => {
  const [favourite, setFavourite] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  const dispatch = useDispatch();
  const user_data = JSON.parse(localStorage.getItem("loginuser"));

  const favoritpodcast = async () => {
    console.log(user_data);
    if (user_data === null || user_data === undefined) {
      dispatch(openSignin());
      return;
    }
    const u_id = user_data ? user_data.id : 0;
    const updatedUser = user
      ? { ...user, favorites: [...user.favorites, podcast] }
      : { favorites: [podcast] };
    dispatch(setUser(updatedUser));
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setFavourite(true);

    const dataToSend = { ...updatedUser, u_id };

    try {
      const res = await axios.post("http://localhost:8080/insfev", dataToSend, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.data.message === "Success") {
        message.success("Podcast added to favorites successfully");
      } else {
        message.error("Failed to add podcast to favorites");
      }
    } catch (error) {
      console.error("Error adding podcast to favorites:", error);
      message.error("An error occurred while adding podcast to favorites");
    }
  };

  const unfavoritpodcast = () => {
    if (user_data === null || user_data === undefined) {
      dispatch(openSignin());
      return;
    }
    const updatedFavorites = user.favorites.filter(
      (fav) => fav.v_id !== podcast.v_id
    );
    const updatedUser = { ...user, favorites: updatedFavorites };
    dispatch(setUser(updatedUser));
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setFavourite(false);
    Modal.confirm({
      title: "Are you sure you want to remove this podcast from favorites?",
      okType: "danger",
      onOk: async () => {
        try {
          const res = await axios.delete(
            `http://localhost:8080/delfev/${podcast.v_id}`
          );
          if (res.data.status === "Success") {
            message.success(res.data.message);
          } else {
            message.error(res.data.message);
          }
        } catch (err) {
          message.error(
            "An error occurred while removing the podcast from favorites"
          );
        }
      },
    });
  };

  const deletePodcast = () => {
    Modal.confirm({
      title: "Are you sure you want to delete this podcast?",
      okType: "danger",
      onOk: async () => {
        try {
          const res = await axios.delete(
            `http://localhost:8080/delvid/${podcast.v_id}`
          );
          if (res.data.status === "Success") {
            message.success("Podcast deleted successfully");
          } else {
            message.error("Failed to delete podcast");
          }
        } catch (err) {
          message.error("An error occurred while deleting the podcast");
        }
      },
    });
  };

  const handleviewupdate = async (v_id, views) => {
    try {
      const res = await axios.put("http://localhost:8080/update_views", {
        views: views + 1,
        v_id: v_id,
      });
      if (res.data.status === "Success") {
        console.log(res.data.message);
      } else {
        console.log(res.data.message);
      }
    } catch (err) {
      console.error("Error updating views:", err);
    }
  };

  const fetchData = async () => {
    try {
      const u_id = user_data ? user_data.id : 0;
      const response = await axios.put(
        `http://localhost:8080/fatchfavouritedata/${u_id}`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        const updatedUser = { ...user, favorites: response.data.data };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        if (
          JSON.stringify(user.favorites) !==
          JSON.stringify(updatedUser.favorites)
        ) {
          setUser(updatedUser);
          localStorage.setItem("user", JSON.stringify(updatedUser));
        }
      }
    } catch (error) {
      console.error("Error fetching session:", error);
    }
  };

  useEffect(() => {
    fetchData();

    if (user?.favorites?.some((fav) => fav.v_id === podcast.v_id)) {
      setFavourite(true);
    } else {
      setFavourite(false);
    }
  }, [podcast.v_id, user_data]);

  return (
    <Card>
      <Top>
        <Favorite>
          {favourite ? (
            <FavoriteIcon
              style={{ color: "#E30022", width: "16px", height: "16px" }}
              onClick={unfavoritpodcast}
            />
          ) : (
            <FavoriteIcon
              style={{ width: "16px", height: "16px" }}
              onClick={favoritpodcast}
            />
          )}
        </Favorite>
        {showDeleteButton && (
          <DeleteButton onClick={deletePodcast}>
            <DeleteIcon style={{ width: "16px", height: "16px" }} />
          </DeleteButton>
        )}
        <CardImage
          src={
            podcast.thubnail
              ? `${baseUrl}/${podcast.thubnail}`
              : "https://t3.ftcdn.net/jpg/03/89/66/40/360_F_389664003_euiB7gaAQ0zMM74c0GBV9fOgeHqM0GZU.jpg"
          }
        />
      </Top>
      <CardInformation>
        <MainInfo>
          <Title>{podcast.v_name}</Title>
          <Description>{podcast.description}</Description>
          <CreatorInfo>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {/* <Avatar >Y</Avatar> */}

              {podcast.u_name && (
                <Avatar style={{ width: "26px", height: "26px" }}>
                  {podcast.u_name.charAt(0).toUpperCase()}
                </Avatar>
              )}

              <CreatorName>{podcast.u_name}</CreatorName>
            </div>
            <Views>• {podcast.views} views</Views>
          </CreatorInfo>
        </MainInfo>
      </CardInformation>
      <PlayIcon>
        {"video" === "video" ? (
          <PlayArrowIcon
            onClick={() => {
              setVideoOpen(true);
              handleviewupdate(podcast.v_id, podcast.views);
            }}
            style={{ width: "28px", height: "28px" }}
          />
        ) : (
          <HeadphonesIcon style={{ width: "28px", height: "28px" }} />
        )}
      </PlayIcon>
      <VideoPlayer
        open={videoOpen}
        setOpen={setVideoOpen}
        thumbnail={podcast.thubnail}
        path={podcast.path}
      />
    </Card>
  );
};

export default PodcastCard;
