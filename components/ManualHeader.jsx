
import { useEffect } from 'react';
import { useMoralis } from 'react-moralis'


function ManualHeader() {

  const {enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3, isWeb3EnableLoading} = useMoralis();

  useEffect(() => {
    if(isWeb3Enabled) return;

    if(!window.localStorage.getItem("Connected") == "Injected") return;

    // enableWeb3()
  }, [isWeb3Enabled])

    useEffect(() => {
      Moralis.onAccountChanged((account) => {
        console.log(`Accoint changed to ${account}`)
        if(account == null) { // якщо ніякий акаунт не підкл (відключили) то прибрати автро підключення
          window.localStorage.removeItem("Connected")
          deactivateWeb3();
        }
      })
    }, [])

  return(
    <div>
      {account 
        ? ( <div>Connected {account.slice(0, 6)}...{account.slice(account.length - 4)}</div> ) 
        : (<button onClick={
          async () => {
            await enableWeb3()
            window.localStorage.setItem("Connected", "Injected")
          }
        }
        disabled={isWeb3EnableLoading}
        >Connect</button>)}
    </div>

  )
}

export default ManualHeader;
