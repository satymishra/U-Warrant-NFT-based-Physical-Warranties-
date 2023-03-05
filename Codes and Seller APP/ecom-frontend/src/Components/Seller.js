import axios from "../axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import { useStateValue } from "../StateProvider";
import { Typography } from "@material-ui/core";

function Seller() {
  const [{ user }] = useStateValue();
  const [seller, setSeller] = useState([]);
  useEffect(() => {
    axios
      .post("/seller/get")
      .then((res) => setSeller(res.data));
  }, []);
  console.log(seller);

  
    

  return (
    <Container>
  
      
   
     

    
      <Main>

        <OrderContainer>
          <OrderContainer>
        <Typography style={{fontWeight:'600'}}><h1>Your Dashboard</h1></Typography>
      <NFTbutton style={{color:'white', fontWeight:'600'}}>Your monthly sales</NFTbutton>
      <NFTbutton style={{color:'white', fontWeight:'600'}}>Inventory details</NFTbutton>
      <NFTbutton style={{color:'white', fontWeight:'600'}}>Warranty claims</NFTbutton>
      <NFTbutton style={{color:'white', fontWeight:'600'}}>Top selling SKUs</NFTbutton>
      <NFTbutton style={{color:'white', fontWeight:'600'}}>Recent orders</NFTbutton>
      
      </OrderContainer>

          <Mainhead>Your Sales</Mainhead>

          {seller.map((seller) => (
            <OrderDetail>
              <AddressComponent>
                <h4>Shipping Address</h4>

                <div>
                  <p>{seller.address.fullName}</p>
                  <p>{seller.address.flat}</p>
                  <p>{seller.address.area}</p>

                  <p>
                    {seller.address.city} {seller.address.state}
                  </p>
                  <p>Phone : {seller.address.phone}</p>
                  <strong><h3>Owner NFT wallet address : {seller.address.NFTaddress}</h3></strong>
                  

                </div>
              </AddressComponent>
              <OrderBasket>
                <h4>Order</h4>
                <p>
                  Subtotal : ₹ <span>{seller.price}</span>
                </p>

                {seller.products.map((product) => (
                  <Product>
                    <Image>
                      <img src={product.image} alt="" />
                    </Image>
                    <Description>
                      <h4>{product.title}</h4>

                      <p>₹ {product.price}</p>
                      
                    </Description>
                    <NFTbutton onClick={() => window.open("http://localhost:3000/create-nft", "_blank")} style={{color:'white', fontWeight:'600',cursor:"pointer" }}>Mint NFT</NFTbutton>
                    <NFTbutton style={{color:'white', fontWeight:'600'}}>Dispatch Order</NFTbutton>
                  </Product>
                ))}
              </OrderBasket>
            </OrderDetail>
          ))}
        </OrderContainer>
      </Main>
      
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: fit-content;
 

  margin: auto;
  background-color: rgb(234, 237, 237);
`;
const UpperContainer=styled.div`
width: 100%;
height: 100%;

display: flex;
flex-direction: column;
background-color: #fff;
z-index: 10;`

const Main = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
`;

const OrderContainer = styled.div`
  padding: 15px;

  background-color: #fff;
  width: 95%;

  h2 {
    font-weight: 500;
    border-bottom: 1px solid lightgray;
    padding-bottom: 15px;
  }
`;

const OrderDetail = styled.div`
  border-bottom: 1px solid lightgray;
  padding-bottom: 20px;
`;

const AddressComponent = styled.div`
  margin-top: 20px;

  div {
    margin-top: 10px;
    margin-left: 10px;

    p {
      font-size: 14px;
      margin-top: 4px;
    }
  }
`;

const OrderBasket = styled.div`
  margin-top: 20px;

  p {
    font-size: 15px;
    margin-left: 15px;
    margin-top: 15px;

    span {
      font-weight: 600;
    }
  }
`;

const Product = styled.div`
  display: flex;
  align-items: center;
`;

const Image = styled.div`
  flex: 0.3;
  img {
    width: 100%;
  }
`;
const Description = styled.div`
  flex: 0.7;

  h4 {
    font-weight: 600;
    font-size: 18px;

    @media only screen and (max-width: 1200px) {
      font-size: 14px;
    }
  }

  p {
    font-weight: 600;
    margin-top: 10px;
  }

  button {
    background-color: transparent;
    color: #1384b4;
    border: none;
    outline: none;
    margin-top: 10px;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;
const NFTbutton=styled.button`
width: 10%;
height: 45px;
background-color: #12737F;
border: none;
outline: none;
border-radius: 10px;
margin-right :30px;
margin-top: 30px;`

const Mainhead=styled.h2`
margin-top:10px;
padding:20px;
`




export default Seller;
