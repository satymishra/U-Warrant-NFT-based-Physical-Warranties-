import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useStateValue } from "../StateProvider";
import Navbar from "./Navbar";
function Address() {
  const [{}, dispatch] = useStateValue();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [flat, setFlat] = useState("");
  const [area, setArea] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [NFTaddress,setNFTaddress]=useState("");

  const navigate = useNavigate();

  const deliver = (e) => {
    e.preventDefault();

    dispatch({
      type: "SET_ADDRESS",
      item: {
        fullName,
        phone,
        flat,
        area,
        city,
        state,
        NFTaddress,
      },
    });

    navigate("/payment");
  };

  return (
    <Container>
      <Navbar />
      <Main>
        <FormContainer>
          <InputContainer>
            <p>Full Name</p>
            <input
              onChange={(e) => setFullName(e.target.value)}
              type="text"
              placeholder="John Smith"
              value={fullName}
            />
          </InputContainer>
          <InputContainer>
            <p>Phone Number</p>
            <input
              type="text"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            />
          </InputContainer>
          <InputContainer>
            <p>Flat, House no. Building, Company</p>
            <input
              type="text"
              onChange={(e) => setFlat(e.target.value)}
              value={flat}
            />
          </InputContainer>
          <InputContainer>
            <p>Area, Colony, Street</p>
            <input
              type="text"
              onChange={(e) => setArea(e.target.value)}
              value={area}
            />
          </InputContainer>
          <InputContainer>
            <p>Landmark</p>
            <input
              type="text"
              onChange={(e) => setLandmark(e.target.value)}
              value={landmark}
            />
          </InputContainer>
          <InputContainer>
            <p>Town/City</p>
            <input
              type="text"
              onChange={(e) => setCity(e.target.value)}
              value={city}
            />
          </InputContainer>
          <InputContainer>
            <p>State/Province</p>
            <input
              type="text"
              onChange={(e) => setState(e.target.value)}
              value={state}
            />
          </InputContainer>
          <InputContainer>
            <p>Your NFT wallet Address</p>
            <input
              type="String"
              onChange={(e) => setNFTaddress(e.target.value)}
              value={NFTaddress}
            />
          </InputContainer>

          <button style={{color:'white', fontWeight:'600'}} onClick={deliver}>Deliver to this Address</button>
        </FormContainer>
      </Main>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;


  margin: auto;
  background-color: rgb(234, 237, 237);

  position: relative;
`;

const Main = styled.div`
  padding: 15px;
`;

const FormContainer = styled.form`
  border: 1px solid lightgray;
  width: 55%;
  min-width: 400px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
  background-color: #fff;
  margin: auto;

  button {
    align-self: flex-start;
    width: 30%;
height: 45px;
background-color: #12737F;
border: 10px;
outline: none;
border-radius: 10px;
margin-right :30px;
margin-top: 30px;
    cursor: pointer;
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
export default Address;
