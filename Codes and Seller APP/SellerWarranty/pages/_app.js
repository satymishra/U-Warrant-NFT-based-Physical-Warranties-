import '../styles/globals.css'
import Link from 'next/link'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <nav className="border-b p-6">
        <p className="text-4xl font-bold">Flipkart Warranty Site</p>
        <div className="flex mt-4">
          <Link href="/">
            <a className="mr-4 text-blue-500">
              Get NFTs
            </a>
          </Link>
          <Link href="/create-nft">
            <a className="mr-6 text-blue-500">
              Create NFT Warranty
            </a>
          </Link>
          <Link href="/my-nfts">
            <a className="mr-6 text-blue-500">
              My Orders
            </a>
          </Link>
          <Link href="/dashboard">
            <a className="mr-6 text-blue-500">
              Dashboard
            </a>
          </Link>
        </div>
      </nav>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp