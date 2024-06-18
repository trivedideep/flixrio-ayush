import React, { useState,useEffect } from "react";
import "./Profile.css";
import useSession from "../hooks/useSession";
import { CloseRounded, ColorizeSharp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "./Dashboard";
import styled from "styled-components";
import axios from 'axios';

const Logo = styled.div`
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
`;

const Text = styled.div`
  color: ${({ theme }) => theme.text_secondary};
`;

const Profiledetiles = styled.div`
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
`;

const Profilecard = styled.div`
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
`;

const Profile = () => {
  const { user } = useSession();

  const navigate = useNavigate();
  const[mostviews,setmostviews]=useState([]);
  const[mostrecent,setmostrecent]=useState([]);
  const[userdata,setuserdata]=useState([]);



  const fetchData = async (user_data) => {
    try {
      // console.log(user_data);
     const u_id = user_data ? user_data.id : 0;
    //  console.log(u_id);
      const response = await axios.put(
        `http://localhost:8080/myvid_mostview/${u_id}`,
        {
          withCredentials: true, // Ensure cookies are sent
        }

      );
      if (response.status === 200) {
        //console.log(response);
        setmostviews(response.data.data);
  
      } else {
        //setVideos(null);
      }
    } catch (error) {
      console.error("Error fetching session:", error);
      //setVideos(null);
    }
  };

  // fetchData();
  useEffect(() => {
    // console.log(user);
    fetchData(user);
  }, [user]);

  const fetchData1 = async (user_data) => {
    try {
      // console.log(user_data);
     const u_id = user_data ? user_data.id : 0;
    //  console.log(u_id);
      const response = await axios.put(
        `http://localhost:8080/myvid_recentvideo/${u_id}`,
        {
          withCredentials: true, // Ensure cookies are sent
        }

      );
      if (response.status === 200) {
        //console.log(response);
        setmostrecent(response.data.data);
  
      } else {
        //setVideos(null);
      }
    } catch (error) {
      console.error("Error fetching session:", error);
      //setVideos(null);
    }
  };

  // fetchData();
  useEffect(() => {
    // console.log(user);
    fetchData1(user);
  }, [user]);

  useEffect(() => {
    // console.log(user);
    fetchData(user);
  }, [user]);

  const fetchData2 = async (user_data) => {
    try {
      // console.log(user_data);
     const u_id = user_data ? user_data.id : 0;
    //  console.log(u_id);
      const response = await axios.put(
        `http://localhost:8080/userdata/${u_id}`,
        {
          withCredentials: true, // Ensure cookies are sent
        }

      );
      if (response.status === 200) {
        //console.log(response);
        setuserdata(response.data.data);
  
      } else {
        //setVideos(null);
      }
    } catch (error) {
      console.error("Error fetching session:", error);
      //setVideos(null);
    }
  };

  // fetchData();
  useEffect(() => {
    // console.log(user);
    fetchData2(user);
  }, [user]);

  return (
    <div
      class="page-content page-container"
      id="page-content"
      style={{ heght: "100%" }}
    >
      <div class="padding">
        <div class="row container d-flex justify-content-center">
          <div class="col-xl-6 col-md-12">
            <div class="card user-card-full">
              <Profilecard>
                <Logo>
                  <div class="card-block text-center text-white">
                    <div class="m-b-25">
                      <img
                        src="https://img.icons8.com/bubbles/100/000000/user.png"
                        class="img-radius"
                        alt="User-Profile"
                      />
                    </div>
                    <Text>{userdata[0]?userdata[0].u_name:""}</Text>
                    {/* <i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i> */}
                  </div>
                </Logo>
                <Profiledetiles class="col-sm-8">
                  <div class="card-block">
                    <h6
                      class="m-b-20 p-b-5 b-b-default f-w-600"
                      style={{ fontSize: "20px" }}
                    >
                      Information
                      <CloseRounded
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "15px",
                          cursor: "pointer",
                        }}
                        onClick={() => navigate("/")}
                      />
                    </h6>

                    <div class="row">
                      <div class="col-sm-6">
                        <p class="m-b-10 f-w-600" style={{ fontSize: "15px" }}>
                          Email
                        </p>
                        <h6 class="text-muted f-w-400">{userdata[0]?userdata[0].email:""}</h6>
                      </div>
                      <div class="col-sm-6">
                        <p class="m-b-10 f-w-600" style={{ fontSize: "15px" }}>
                          Phone
                        </p>
                        <h6 class="text-muted f-w-400">{userdata[0]?userdata[0].mono:""}</h6>
                      </div>
                    </div>
                    <h6
                      class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600"
                      style={{ fontSize: "20px" }}
                    >
                      Video stats
                    </h6>
                    <div class="row">
                      <div class="col-sm-6">
                        <p class="m-b-10 f-w-600" style={{ fontSize: "15px" }}>
                          Recent
                        </p>
                        <h6 class="text-muted f-w-400">{mostrecent[0]?mostrecent[0].v_name:""}</h6>
                      </div>
                      <div class="col-sm-6">
                        <p class="m-b-10 f-w-600" style={{ fontSize: "15px" }}>
                          Most Viewed
                        </p>
                        <h6 class="text-muted f-w-400">{mostviews[0]?mostviews[0].v_name:""}</h6>
                      </div>
                    </div>
                  </div>
                </Profiledetiles>
              </Profilecard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
