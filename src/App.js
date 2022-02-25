import { useState, useEffect } from 'react'
// import api category from amplify
import { API } from 'aws-amplify'
import './App.css';

function App() {
  // state to hold user input for limit and start
  const [input, updateInput] = useState({ limit: 5, start: 0})

  // state for coins
  const [coins, updateCoins] = useState([])

  // define function for users to update input values
  function updateInputValues(type, value) {
    updateInput({...input, [type]: value})
  }

  // define function to all api
  async function fetchCoins() {
    const { limit, start } = input
    const data = await API.get('cryptoapi', `/coins?limit=${limit}&start=${start}`)
    updateCoins(data.coins)
  }


  // call fetchCoins when component loads
  useEffect(() => {
    fetchCoins()
  }, [])

  return (
    <div className="App">
      <input onChange={e => updateInputValues('limit', e.target.value)} placeholder="limit" />
      <input onChange={e => updateInputValues('start', e.target.value)} placeholder="start" />
      <button onClick={fetchCoins}>fetch coins</button>

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
