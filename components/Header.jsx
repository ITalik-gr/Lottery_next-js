import { ConnectButton } from "web3uikit";

function Header() {
  return (
    <div className="p-5 border-b-2 flex flex-row">
      <h1 className="py-4 px-4 font-bold text-3xl">Decentralize Lottery</h1>
      <div className="px-2 py-4 ml-auto"><ConnectButton moralisAuth={false} /></div>
    </div>
  )
}

export default Header;