import { useState, useEffect } from 'react'
// import api category from amplify
import { API } from 'aws-amplify'
import './App.css';

function App() {
  const [coins, updateCoins] = useState([])
  
  // define function to all api
  async function fetchCoins() {
    const data = await API.get('cryptoapi', '/coins')
    updateCoins(data.coins)
  }

  // call fetchCoins when component loads
  useEffect(() => {
    fetchCoins()
  }, [])

  return (
    <div className="App">
      {
        coins.map((coin, index) => (
          <div key={index}>
            <h2>{coin.name} - {coin.symbol}</h2>
            <h5>${coin.price_usd}</h5>
          </div>
        ))
      }
    </div>
  );
}

export default App;
