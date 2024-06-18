import React from "react";
import "./Profile.css";
import useSession from "../hooks/useSession";
import { CloseRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "./Dashboard";
import styled from "styled-components";

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
                    <Text>{user?.name}</Text>
                    <Text>Web Designer</Text>
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
                        <h6 class="text-muted f-w-400">{user?.email}</h6>
                      </div>
                      <div class="col-sm-6">
                        <p class="m-b-10 f-w-600" style={{ fontSize: "15px" }}>
                          Phone
                        </p>
                        <h6 class="text-muted f-w-400">{user?.phone}</h6>
                      </div>
                    </div>
                    <h6
                      class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600"
                      style={{ fontSize: "20px" }}
                    >
                      Projects
                    </h6>
                    <div class="row">
                      <div class="col-sm-6">
                        <p class="m-b-10 f-w-600" style={{ fontSize: "15px" }}>
                          Recent
                        </p>
                        <h6 class="text-muted f-w-400">Sam Disuja</h6>
                      </div>
                      <div class="col-sm-6">
                        <p class="m-b-10 f-w-600" style={{ fontSize: "15px" }}>
                          Most Viewed
                        </p>
                        <h6 class="text-muted f-w-400">Dinoter husainm</h6>
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
