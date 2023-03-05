import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
function SignUp() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = (e) => {
    e.preventDefault();
    axios
      .post("/auth/signup", { email, password, fullName })
      .then((res) => alert(res.data.message))
      .catch((err) => console.warn(err));

    navigate("/login");
  };
  return (
    <Container>
      <Logo onClick={() => navigate("/")}>
        <img src="./amazon_logo.png" alt="" />
      </Logo>
      <FormContainer>
        <h3>Sign-Up</h3>
        <InputContainer>
          <p>Name</p>
          <input
            type="text"
            placeholder="Your Name Ex Rahul Singh"
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
          />
        </InputContainer>
        <InputContainer>
          <p>Email</p>
          <input
            type="email"
            placeholder="example@example.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </InputContainer>
        <InputContainer>
          <p>Password</p>
          <input
            type="password"
            placeholder="********"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </InputContainer>

        <SignUpButton style={{color:'Black', fontWeight:'600'}}  onClick={signup}>Create Account in Electrobiz</SignUpButton>
      </FormContainer>

      <LoginButton style={{color:'white', fontWeight:'600'}} onClick={() => navigate("/login")}>
        Back to Login
      </LoginButton>
    </Container>
  );
}
const Container = styled.div`
  width: 40%;
 
  height: fit-content;
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
  border: 1px solid lightgray;
  width: 55%;
  height: 400px;
  display: flex;
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

    &:hover {
      border: 1px solid orange;
    }
  }
`;

const SignUpButton = styled.button`
  width: 100%;
  height: 35px;
  font-size: 12px;
  margin-top: 20px;
  background-color: #12737H ;
  border-radius:10px;
  border:none;

  &:hover {
    background-color: #dfdfdf;
    
  }
`;

const LoginButton = styled.button`
width: 40%;
height: 45px;
background-color: #12737F;
border: 10px;
outline: none;
border-radius: 10px;
margin-right :30px;
margin-top: 30px;
    cursor: pointer;
`;

export default SignUp;
