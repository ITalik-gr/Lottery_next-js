
import { useMoralis } from 'react-moralis'


function ManualHeader() {

  const {enableWeb3} = useMoralis();

  return(
    <div className="container-xl mx-auto px-4">Hi From Header</div>
  )
}

export default ManualHeader;