import {
  CloseRounded,
  EmailRounded,
  PasswordRounded,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { closeSignin } from "../redux/setSigninSlice";
import { useNavigate } from "react-router-dom";
import LoginValidation from "./Loginvalidation";
import axios from "axios";
import useSession from "../hooks/useSession";
import { openSignup } from "../redux/setSignupSlice";
import Resetpassvali from "./Resetpassvali";
import useEmailValidation from "../hooks/useEmailValidation";

import { setUser } from "../redux/favSlice";

const TextInput = styled.input`
  width: 100%;
  border: none;
  font-size: 14px;
  border-radius: 3px;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text_secondary};
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const ForgetPassword = styled.div`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 13px;
  margin: 8px 26px;
  display: block;
  cursor: pointer;
  text-align: right;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const Wrapper = styled.div`
  width: 380px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text_primary};
  padding: 10px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Title = styled.div`
  font-size: 22px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
  margin: 16px 28px;
`;

const OutlinedBox = styled.div`
  height: 44px;
  border-radius: 12px;
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
    background: ${theme.primary};
    color:'${theme.bg}';`}
    ${({ activeButton, theme }) =>
    activeButton &&
    `
    user-select: none; 
  border: none;
    background: ${theme.text_secondary};
    color: white;`}
  margin: 3px 20px;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  padding: 0px 14px;
`;

const Error = styled.div`
  color: red;
  font-size: 10px;
  margin: 2px 26px 8px 26px;
  display: ${({ error }) => (error ? "block" : "none")};
`;

const LoginText = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: white;
  margin: 20px 20px 30px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Span = styled.span`
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
`;

const Login = () => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });
  const [restvalues, setrestValues] = useState({
    restEmail: "",
    restpass1: "",
    restpass2: "",
    restshowPassword1: false,
    restshowPassword2: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const navigate = useNavigate();
  const { user, fetchSession } = useSession();
  const { isEmailValid, validateEmail } = useEmailValidation();

  const [resettingPassword, setResettingPassword] = useState(false);

  const [resetDisabled, setResetDisabled] = useState(true);

  const { userFav } = useSelector((state) => state.fav);

  const [Loading] = useState(false);

  const closeForgetPassword = () => {
    setShowForgotPassword(false);
  };
  const resthandleChange = async (e) => {
    setrestValues({ ...restvalues, [e.target.name]: e.target.value });

    if (e.target.name === "restEmail") {
      await validateEmail(e.target.value);
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const fetchData_fav = async () => {
    try {
      const u_id = user ? user.id : 0;
      const response = await axios.put(
        `http://localhost:8080/fatchfavouritedata/${u_id}`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        const updatedUser = { ...userFav, favorites: response.data.data };
        if (
          JSON.stringify(userFav?.favorites) !==
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

  const resthandleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = Resetpassvali(restvalues);
    setErrors(validationErrors);
    if (
      validationErrors.restEmail !== "" ||
      validationErrors.restpass1 !== "" ||
      validationErrors.restpass2 !== ""
    ) {
      return;
    }

    if (!isEmailValid) {
      setLoading(true);

      try {
        const response = await axios.post(
          "http://localhost:8080/upuser",
          restvalues,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true, // Ensure cookies are sent
          }
        );
        const data = response.data;

        if (data.status === "Success") {
          alert("paaword update sucessful");

          // Fetch session data to update the frontend state
          fetchSession();
          dispatch(closeSignin());
        } else {
          //console.log('Login failed');
          alert("password update failed");
        }
      } catch (error) {
        console.error("Error logging in:", error);
      }
    } else if (isEmailValid) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        restEmail: "Email not exists",
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = LoginValidation(values);
    setErrors(validationErrors);
    if (validationErrors.email !== "" || validationErrors.password !== "") {
      return;
    }
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8080/login", values, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Ensure cookies are sent
      });
      const data = response.data;
      if (data === "Success") {
        // Fetch session data to update the frontend state
        fetchSession();
        fetchData_fav();
        dispatch(closeSignin());

        navigate("/");
      } else {
        alert("Email or password invalid");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }

    setLoading(false);
  };

  return (
    <Container>
      {!showForgotPassword ? (
        <Wrapper>
          <CloseRounded
            style={{
              position: "absolute",
              top: "24px",
              right: "30px",
              cursor: "pointer",
            }}
            onClick={() => dispatch(closeSignin())}
          />
          <Title>Sign In</Title>
          <OutlinedBox style={{ marginTop: "24px" }}>
            <EmailRounded
              sx={{ fontSize: "30px" }}
              style={{ paddingRight: "12px" }}
            />
            <TextInput
              name="email"
              placeholder="Email Id"
              type="email"
              onChange={handleChange}
              value={values.email}
            />
          </OutlinedBox>
          <Error error={errors.email}>{errors.email}</Error>
          <OutlinedBox>
            <PasswordRounded
              sx={{ fontSize: "30px" }}
              style={{ paddingRight: "12px" }}
            />
            <TextInput
              name="password"
              placeholder="Password"
              type={values.showPassword ? "text" : "password"}
              onChange={handleChange}
              value={values.password}
            />
            <IconButton
              color="inherit"
              onClick={() =>
                setValues({ ...values, showPassword: !values.showPassword })
              }
            >
              {values.showPassword ? (
                <Visibility sx={{ fontSize: "20px" }} />
              ) : (
                <VisibilityOff sx={{ fontSize: "20px" }} />
              )}
            </IconButton>
          </OutlinedBox>
          <Error error={errors.password}>{errors.password}</Error>
          <ForgetPassword onClick={() => setShowForgotPassword(true)}>
            <b>Forgot password?</b>
          </ForgetPassword>
          <OutlinedBox
            button
            onClick={handleSubmit}
            style={{ marginTop: "6px", cursor: "pointer", color: "white" }}
          >
            {loading ? <CircularProgress size={20} /> : "Sign In"}
          </OutlinedBox>
          <LoginText>
            Don't have an account?
            <Span
              onClick={() => {
                dispatch(closeSignin());
                dispatch(openSignup());
              }}
              style={{
                fontWeight: "500",
                marginLeft: "6px",
                cursor: "pointer",
              }}
            >
              Create Account
            </Span>
          </LoginText>
        </Wrapper>
      ) : (
        <Wrapper>
          <CloseRounded
            style={{
              position: "absolute",
              top: "24px",
              right: "30px",
              cursor: "pointer",
            }}
            onClick={() => {
              closeForgetPassword();
              dispatch(closeSignin());
            }}
          />
          <>
            <Title>Reset Password</Title>
            {resettingPassword ? (
              <div
                style={{
                  padding: "12px 26px",
                  marginBottom: "20px",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "14px",
                  justifyContent: "center",
                }}
              >
                Updating password
                <CircularProgress color="inherit" size={20} />
              </div>
            ) : (
              <>
                <OutlinedBox style={{ marginTop: "24px" }}>
                  <EmailRounded
                    sx={{ fontSize: "30px" }}
                    style={{ paddingRight: "12px" }}
                  />
                  <TextInput
                    name="restEmail"
                    placeholder="Email Id"
                    type="email"
                    onChange={resthandleChange}
                    value={restvalues.restEmail}
                  />
                </OutlinedBox>
                <Error error={errors.restEmail}>{errors.restEmail}</Error>
                <OutlinedBox>
                  <PasswordRounded
                    sx={{ fontSize: "30px" }}
                    style={{ paddingRight: "12px" }}
                  />
                  <TextInput
                    name="restpass1"
                    placeholder="Password"
                    type={restvalues.restshowPassword1 ? "text" : "password"}
                    onChange={resthandleChange}
                    value={restvalues.restpass1}
                  />
                  <IconButton
                    color="inherit"
                    onClick={() =>
                      setrestValues({
                        ...restvalues,
                        restshowPassword1: !restvalues.restshowPassword1,
                      })
                    }
                  >
                    {restvalues.restshowPassword1 ? (
                      <Visibility sx={{ fontSize: "30px" }} />
                    ) : (
                      <VisibilityOff sx={{ fontSize: "20px" }} />
                    )}
                  </IconButton>
                </OutlinedBox>
                <Error error={errors.restpass1}>{errors.restpass1}</Error>

                <OutlinedBox>
                  <PasswordRounded
                    sx={{ fontSize: "30px" }}
                    style={{ paddingRight: "12px" }}
                  />
                  <TextInput
                    name="restpass2"
                    placeholder="Confirm Password"
                    type={restvalues.restshowPassword2 ? "text" : "password"}
                    onChange={resthandleChange}
                    value={restvalues.restpass2}
                  />
                  <IconButton
                    color="inherit"
                    onClick={() =>
                      setrestValues({
                        ...restvalues,
                        restshowPassword2: !restvalues.restshowPassword2,
                      })
                    }
                  >
                    {restvalues.restshowPassword2 ? (
                      <Visibility sx={{ fontSize: "20px" }} />
                    ) : (
                      <VisibilityOff sx={{ fontSize: "20px" }} />
                    )}
                  </IconButton>
                </OutlinedBox>
                <Error error={errors.restpass2}>{errors.restpass2}</Error>
                <OutlinedBox
                  button={true}
                  onClick={resthandleSubmit}
                  activeButton={!resetDisabled}
                  style={{
                    marginTop: "6px",
                    marginBottom: "24px",
                    color: "white",
                  }}
                >
                  {Loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : (
                    "Submit"
                  )}
                </OutlinedBox>
                <LoginText>
                  Don't have an account ?
                  <Span
                    onClick={() => {
                      dispatch(openSignup());
                      dispatch(closeSignin());
                    }}
                    style={{
                      fontWeight: "500",
                      marginLeft: "6px",
                      cursor: "pointer",
                    }}
                  >
                    Create Account
                  </Span>
                </LoginText>
              </>
            )}
          </>
        </Wrapper>
      )}
    </Container>
  );
};

export default Login;
