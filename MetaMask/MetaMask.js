import {ethers} from "ethers";
import {useEffect, useState} from "react";

const MetaMask = () => {
  const [isPending, setIsPending] = useState(true);

  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [error, setError] = useState(false);

  const connectMetaMask = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      console.log("MetaMask Here!");
      updataAccount();
    } else {
      console.log("Need to install MetaMask");
      setError("Please install MetaMask browser extension to interact");
    }
  };

  const updataAccount = async () => {
    try {
      if (!window.ethereum) 
        throw new Error("Please install MetaMask")
    } catch (err) {
      console.log(err.message)
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();

    const myAddress = await signer.getAddress();
    setAddress(myAddress);

    const myBalance = await signer.getBalance();
    setBalance(ethers.utils.formatEther(myBalance));

    setIsPending(false);
    setError(false)
  };

  const chainChangedHandler = () => {
    // reload the page to avoid any errors with chain change mid use of application
    window.location.reload();
  };

  // events
  window.ethereum.on("accountsChanged", updataAccount);

  window.ethereum.on("chainChanged", chainChangedHandler);

  useEffect(() => {
    connectMetaMask();
  }, []);

  return {error, isPending, address, balance};
};

export default MetaMask;
