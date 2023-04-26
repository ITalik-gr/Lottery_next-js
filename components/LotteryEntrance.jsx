import { useWeb3Contract } from "react-moralis";
import { abi, contractAddresses } from "@/constants";
import { useMoralis } from "react-moralis";
import { useState, useEffect } from "react";
import { ethers } from "ethers"

function LotteryEntrance() {
  const {chainId: chainIdHex, isWeb3Enabled} = useMoralis();

  const chainId = parseInt(chainIdHex);
  const raffleAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null

  const [entranceFee, setEntranceFee] = useState("0")

  // const {runContractFunction: enterRaffle} = useWeb3Contract({
  //   abi: abi,
  //   contractAddress: raffleAddress,
  //   functionName: "enterRaffle",
  //   params: {},
  //   msgValue: 1,
  // })

  const {runContractFunction: getEntranceFee} = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "getEntranceFee",
    params: {},
  })


  useEffect(() => {
    if(isWeb3Enabled) {
      async function updateUI() {
        const entranceFeeFromCall = (await getEntranceFee()).toString();
        setEntranceFee(ethers.utils.formatUnits(entranceFeeFromCall), "ether")
      }
      updateUI();
    }
  }, [isWeb3Enabled])

  return(
    <div>
      <div>EntranceFee - {entranceFee} ETH</div>
    </div>
  )
}
export default LotteryEntrance;