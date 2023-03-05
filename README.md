# NetajiHackers
## Team Members :
1. Satyam Mishra (satymishra)
2. Lakshay Gulati (lakshaycodesgit)
3. Siddharth Majumdar (gizzmosid)


## How to run the apps on localhost
1. Go to the SellerWarranty folder and open cmd and type 
npm i 
npx hardhat run scripts/deploy.js --network mumbai && npm run dev

2. This is the seller side and can run on http://localhost:3000/

3. Open the ecom-backend and ecom-frontend folders and open cmd here in both separately 
and type following in both separately.
npm i
npx nodemon@latest server.js (also press y if it asks that port is busy)

4.This is the user side and can run on http://localhost:3001/

5. you can now order by creating an account and open http://localhost:3001/seller to 
see the seller received the order and click on create warranty.

6. you can go back to orders to see the minted NFT and get it transffered to your own wallet by 
installing metamask extension and creating a wallet.

7. view the NFT on ipfs and its warranty.
