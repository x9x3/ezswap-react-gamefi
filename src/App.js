import { WagmiConfig, createClient } from 'wagmi'
import { getDefaultProvider } from 'ethers'
import Profile from './components/Profile'
import CreatePool from './components/CreatePool'
import PoolList from './components/PoolList'

const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
})

function App() {
  return (
    <WagmiConfig client={client}>
      <Profile />
      <CreatePool />
      <PoolList />
    </WagmiConfig>
  )
}

export default App;
