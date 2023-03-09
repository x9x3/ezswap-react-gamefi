import { WagmiConfig, createClient, configureChains } from 'wagmi';

import { alchemyProvider } from 'wagmi/providers/alchemy';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { mainnet, polygon, goerli } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import PoolList from './components/PoolList';
import CreatePool from './components/CreatePool';
import Header from './components/Header';

const { chains, provider } = configureChains(
  [mainnet, polygon, goerli],
  [
    alchemyProvider({ apiKey: 'eeb2JnW2JdlOkqPH6NZVhVpRSXKaSW8D' }),
    publicProvider(),
  ],
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function App() {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Header />
        {/* <CreatePool /> */}
        <PoolList />
      </RainbowKitProvider>
    </WagmiConfig>
    // <div>
    //   {/* <Header /> */}
    //   {/* <CreatePool /> */}
    //   <PoolList />
    // </div>
  );
}

export default App;
