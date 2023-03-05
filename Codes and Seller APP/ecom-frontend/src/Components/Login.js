import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import { useStateValue } from "../StateProvider";
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [{}, dispatch] = useStateValue();

  const login = (e) => {
    e.preventDefault();

    axios
      .post("/auth/login", { email, password })
      .then((res) => {
        if (!res.data.error) {
          dispatch({
            type: "SET_USER",
            user: res.data,
          });

          localStorage.setItem("user", JSON.stringify(res.data));

          navigate("/");
        } else if (res.data.error) {
          alert(res.data.error);
        }
      })
      .catch((err) => console.warn(err));
  };
  return (
    <Container>
      <Logo onClick={() => navigate("/")}>
        <img src="./amazon_logo.png" alt="" />
      </Logo>

      <FormContainer>
        <h3 style={{color:'white', fontWeight:'600'}}>Sign-In</h3>

        <InputContainer>
          <p style={{color:'white'}}>Email</p>
          <input
            type="email"
            placeholder="example@example.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </InputContainer>
        <InputContainer>
          <p style={{color:'white'}}>Password</p>
          <input
            type="password"
            placeholder="********"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </InputContainer>

        <LoginButton style={{color:'white', fontWeight:'600'}} onClick={login}>Login</LoginButton>

        <InfoText style={{color:'white'}}>
          By continuing, you agree to Electrobiz <span style={{color:'black', fontWeight:'600'}}>Conditions of Use </span>
          and <span style={{color:'black', fontWeight:'600'}}> Privacy Notice</span>
        </InfoText>
      </FormContainer>
      <SignUpButton style={{fontWeight:'600'}} onClick={() => navigate("/signup")}>
        Create Account in Electrobiz
      </SignUpButton>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  
background: linear-gradient(90deg, rgba(13,166,166,1) 10%, rgba(2,174,181,1) 41%, rgba(46,180,180,1) 83%);
  height: 100vh;
  padding: 15px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
 
`;

const Logo = styled.div`
  width: 120px;
  margin-bottom: 20px;
  img {
    width: 100%;
  }
`;

const FormContainer = styled.form`
 
  width: 55%;
  height: 400px;
  display: flex;
  background:#0bbbc2;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;

  h3 {
    font-size: 28px;
    font-weight: 400;
    line-height: 33px;
    align-self: flex-start;

    margin-bottom: 10px;
  }
`;

const InputContainer = styled.div`
  width: 100%;
  padding: 10px;
 

  p {
    font-size: 14px;
    font-weight: 600;
  }

  input {
    width: 95%;
    height: 33px;
    padding-left: 5px;
    border-radius: 5px;
    border: 1px solid lightgray;
    margin-top: 5px;
    background:#A3EAF3;

    &:hover {
      border: 1px solid orange;
    }
  }
`;

const LoginButton = styled.button`
  width: 70%;
  height: 35px;
  background-color: #11737F;
  border: none;
  outline: none;
  border-radius: 10px;
  margin-top: 30px;
`;

const InfoText = styled.p`
  font-size: 12px;
  width: 100%;
  word-wrap: normal;
  word-break: normal;
  margin-top: 20px;

  span {
    color: #426bc0;
  }
`;

const SignUpButton = styled.button`
  width: 55%;
  height: 35px;
  font-size: 12px;
  margin-top: 20px;

  &:hover {
    background-color: #dfdfdf;
    border: 1px solid gray;
  }
`;
export default Login;
