/* pages/resell-nft.js */
import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import axios from 'axios'
import Web3Modal from 'web3modal'
import {link} from './create-nft'
import {
  marketplaceAddress
} from '../config'
import NFTMarketplace from '../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json'
import {vali} from './create-nft'
export default function ResellNFT() {
  const [formInput, updateFormInput] = useState({ price: '', image: '' })
  const router = useRouter()
  const { id, tokenURI } = router.query
  const { image, price } = formInput

  useEffect(() => {
    fetchNFT()
  }, [id])

  async function fetchNFT() {
    if (!tokenURI) return
    const meta = await axios.get(tokenURI)
    updateFormInput(state => ({ ...state, image: meta.data.image }))
  }

  async function listNFTForSale() {
    if (!price) return
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    const priceFormatted = ethers.utils.parseUnits(formInput.price, 'ether')
    let contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)
    let listingPrice = await contract.getListingPrice()

    listingPrice = listingPrice.toString()
    let transaction = await contract.resellToken(id, priceFormatted, { value: listingPrice })
    await transaction.wait()

    router.push('/')
  }
  function change() {
  var x = document.getElementById("myDIV");
  if (x.innerHTML === "Check Warranty") {
    x.innerHTML = vali;
  } else {
    x.innerHTML = "Check Warranty";
  }
}
  const handleClick = () => {
    window.open(link);
  };
  

  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
        {
          image && (
            <img className="rounded mt-4" width="350" src={image} />
          )
        }
        
        <button onClick={handleClick} className="font-bold mt-4 bg-blue-500 text-white rounded p-4 shadow-lg">
         Show My NFT on IPFS
        </button>
        <button id="myDIV" onClick={change} className="font-bold mt-4 bg-blue-500 text-white rounded p-4 shadow-lg">
         Check Warranty
        </button>
      </div>
    </div>
  )
}