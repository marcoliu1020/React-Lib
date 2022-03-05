import MetaMask from "./MetaMask";

const Home = () => {
  const {error, isPending, address, balance} = MetaMask();

  return (
    <div className='Home'>
      <div className='MetaMask'>
        {isPending && <div>Connecting to MetaMask...</div>}
        <div className='error'>{error}</div>
        <div className='account'>
          <h2>Address: {address}</h2>
          <h2>Balance: {balance}</h2>
        </div>
      </div>
    </div>
  );
};

export default Home;
