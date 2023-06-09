import { useWeb3Contract } from "react-moralis";
import { abi, contractAddresses } from "@/constants";
import { useMoralis } from "react-moralis";
import { useState, useEffect } from "react";
import { ethers } from "ethers"
import { Bell, Info, useNotification } from "web3uikit";

function LotteryEntrance() {
  const {chainId: chainIdHex, isWeb3Enabled} = useMoralis();

  const chainId = parseInt(chainIdHex);
  const raffleAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null

  const [entranceFee, setEntranceFee] = useState("0")
  const [numPlayers, setNumPlayers] = useState("0")
  const [recentWinner, setRecentWinner] = useState("0")

  const dispatch = useNotification()

  const {runContractFunction: enterRaffle, isLoading, isFetching} = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "enterRaffle",
    params: {},
    msgValue: entranceFee,
  })

  const {runContractFunction: getEntranceFee} = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "getEntranceFee",
    params: {},
  })

  const {runContractFunction: getNumberOfPlayers} = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "getNumberOfPlayers",
    params: {},
  })

  const {runContractFunction: getRecentWinner} = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "getRecentWinner",
    params: {},
  })


  async function updateUI() {
    const entranceFeeFromCall = (await getEntranceFee()).toString();
    const numPlayersFromCall = (await getNumberOfPlayers()).toString();
    const recentWinnerFromCall = (await getRecentWinner()).toString();
    setEntranceFee(entranceFeeFromCall)
    setNumPlayers(numPlayersFromCall)
    setRecentWinner(recentWinnerFromCall)
  }

  useEffect(() => {
    if(isWeb3Enabled) {
      updateUI();
    }
  }, [isWeb3Enabled])

  const handleSuccess = async function(tx) {
    await tx.wait(1)
    handleNewNotification(tx);
    updateUI(); // після кожної успішної траннзи апдейтить ui
  }

  const handleNewNotification = function() {
    dispatch({
      type: "info",
      message: "Transaction Complete",
      title: "Tx Notification",
      position: "topR",
      icon: "i",
    })
  }

  return(
    <div className="p-5">
       <h1 className="py-4 px-4 font-bold text-3xl">Lottery</h1>
      { raffleAddress 
      ? <>
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded ml-auto"
            onClick={async () =>
                await enterRaffle({
                    onSuccess: handleSuccess,
                    onError: (error) => console.log(error),
                })
            }
            disabled={isLoading || isFetching}>

            {isLoading || isFetching 
              ? (<div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>) 
              : ("Enter Raffle")}
            
          </button>

          <div>Entrance Fee: {ethers.utils.formatUnits(entranceFee, "ether")} ETH</div>
          <div>The current number of players is: {numPlayers}</div>
          <div>The most previous winner was: {recentWinner}</div>
        </>
      : <div>Please connect to a supported chain </div> }
      
    </div>
  )
}
export default LotteryEntrance;