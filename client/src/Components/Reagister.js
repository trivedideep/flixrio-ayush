import {
  CloseRounded,
  EmailRounded,
  PasswordRounded,
  Person,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import React, { useState } from "react";
import styled from "styled-components";
import { IconButton, CircularProgress } from "@mui/material";
import { closeSignup, openSignup } from "../redux/setSignupSlice";
import { openSignin } from "../redux/setSigninSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import regvali from "./regvali";
import useEmailValidation from '../hooks/useEmailValidation';

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
  display: ${({ error }) => (error ? 'block' : 'none')};
`;

const RegisterText = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary};
  margin: 20px 20px 30px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Span = styled.span`
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
`;

const Register = () => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    email: "",
    password: "",
    username: "",
    Mono: "",
    showPassword: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { isEmailValid, validateEmail } = useEmailValidation();

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));

    if (name === "email") {
      await validateEmail(value);
    }
    if(!isEmailValid) {
      setErrors((prevErrors) => ({ ...prevErrors, email: "Email already exists" }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = regvali(values);
    setErrors(validationErrors);
    if (validationErrors.username !== "" || validationErrors.email !== "" || validationErrors.Mono !== "" || validationErrors.password !== "") {
      return;
    }

    if (isEmailValid) {
      setLoading(true);
      try {
        const res = await axios.post('http://localhost:8080/reg', values);
        setLoading(false);
        if (res.data.message === "Success") {
          alert("User created successfully");
          dispatch(closeSignup());
        } else {
          alert("Registration failed");
        }
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    } else if (!isEmailValid) {
      setErrors((prevErrors) => ({ ...prevErrors, email: "Email already exists" }));
    }
  };

  return (
    <Container>
      <Wrapper>
        <CloseRounded
          style={{
            position: "absolute",
            top: "24px",
            right: "30px",
            cursor: "pointer",
          }}
          onClick={() => dispatch(closeSignup())}
        />
        <Title style={{textAlign:"center"}}>Register</Title>
        <OutlinedBox style={{ marginTop: "24px" }}>
          <EmailRounded
            sx={{ fontSize: "20px" }}
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
          <Person
            sx={{ fontSize: "20px" }}
            style={{ paddingRight: "12px" }}
          />
          <TextInput
            name="username"
            placeholder="Username"
            type="text"
            onChange={handleChange}
            value={values.username}
          />
        </OutlinedBox>
        <Error error={errors.username}>{errors.username}</Error>
        <OutlinedBox>
          <PasswordRounded
            sx={{ fontSize: "20px" }}
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
        <OutlinedBox>
          <Person
            sx={{ fontSize: "20px" }}
            style={{ paddingRight: "12px" }}
          />
          <TextInput
            name="Mono"
            placeholder="Mobile No"
            type="text"
            onChange={handleChange}
            value={values.Mono}
          />
        </OutlinedBox>
        <Error error={errors.Mono}>{errors.Mono}</Error>
        <OutlinedBox
          button
          onClick={handleSubmit}
          style={{ marginTop: "6px", cursor: "pointer" }}
        >
          {loading ? (
            <CircularProgress color="inherit" size={20} />
          ) : (
            "Sign Up"
          )}
        </OutlinedBox>
        <RegisterText>
          Already have an account?
          <Span
            onClick={() => {
              dispatch(closeSignup());
              dispatch(openSignin());
            }}
            style={{
              fontWeight: "500",
              marginLeft: "6px",
            }}
          >
            Sign In
          </Span>
        </RegisterText>
      </Wrapper>
    </Container>
  );
};

export default Register;
