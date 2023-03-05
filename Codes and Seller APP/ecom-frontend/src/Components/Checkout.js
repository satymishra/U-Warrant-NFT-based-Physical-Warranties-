import React from "react";
import { useStateValue } from "../StateProvider";
import styled from "styled-components";
import Navbar from "./Navbar";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../reducer";
import { useNavigate } from "react-router-dom";
function Checkout() {
  const [{ basket }, dispatch] = useStateValue();
  const navigate = useNavigate();
  const removeFromBasket = (e, id) => {
    e.preventDefault();

    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };

  console.log("checkout >>>>>", basket);
  return (
    <Container>
      <Navbar />

      <Main>
        <ShoppingCart>
          <h2>Shopping Cart</h2>

          {basket?.map((product) => (
            <Product>
              <Image>
                <img src={product.image} alt="" />
              </Image>
              <Description>
                <h4>{product.title}</h4>

                <p>₹ {product.price}</p>

               
              </Description>
              <Rbutton   style={{color:'white', fontWeight:'600',cursor:'pointer'}} onClick={(e) => removeFromBasket(e, product.id)}>
                  Remove
                </Rbutton>
            </Product>
          ))}
        </ShoppingCart>
        <Subtotal>
          <CurrencyFormat
            renderText={(value) => (
              <>
                <p>
                  Subtotal ( {basket.length} items ) : <strong> {value}</strong>
                </p>
               
              </>
            )}
            decimalScale={2}
            value={getBasketTotal(basket)}
            displayType="text"
            thousandSeparator={true}
            prefix={"₹ "}
          />

          <button style={{background:" #b5d0d9",fontWeight:"600",cursor:'pointer'}} onClick={() => navigate("/address")}>
            Proceed to Checkout
          </button>
        </Subtotal>
      </Main>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  
  height: 100vh;
  margin: auto;
  background-color:rgb(199,223,223);
  hieght:100vh;
  position: relative;
`;
const Main = styled.div`
  display: flex;
  padding: 15px;

  @media only screen and (max-width: 1200px) {
    flex-direction: column;
  }
`;
const ShoppingCart = styled.div`
  padding: 15px;
  background-color: #fff;
  flex: 0.7;
  border-radius:20px;


  @media only screen and (max-width: 1200px) {
    flex: none;
  }

  h2 {
    font-weight: 500;
    border-bottom: 1px solid lightgray;
    padding-bottom: 15px;
  }
`;
const Subtotal = styled.div`
  flex: 0.3;
  background-color:  #fff;
  margin-left: 15px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius:20px;

  @media only screen and (max-width: 1200px) {
    flex: none;
    margin-top: 20px;
  }
  p {
    font-size: 20px;
  }

  small {
    display: flex;
    align-items: center;
    margin-top: 10px;

    span {
      margin-left: 10px;
    }
  }

  button {
    width: 45%;
    font-size:16px;
    height: 53px;
    margin-top: 20px;
    background-color: #ffd814;
    border: none;
    outline: none;
    cursor:pointer;

    border-radius: 8px;
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
  }

  p {
    font-weight: 600;
    margin-top: 10px;
  }

  button {
    background-color: transparent;
    color: #179BAC;
    border: none;
    outline: none;
    margin-top: 10px;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;
const Rbutton=styled.button`
width: 10%;
height: 45px;
background-color: #12737F;
border: none;
outline: none;
border-radius: 10px;
margin-right :30px;
margin-top: 30px;`
export default Checkout;
