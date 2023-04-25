import { useWeb3Contract } from "react-moralis";

function LotteryEntrance() {

  const {runContractFunction: enterRaffle} = useWeb3Contract({
    abi: ,
    contractAddress: ,
    functionName: ,
    params: {},
    msgValue: ,
  })

  return(
    <div>

    </div>
  )
}

export default LotteryEntrance;