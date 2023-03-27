import { WagmiConfig, createClient, configureChains } from 'wagmi';

import { alchemyProvider } from 'wagmi/providers/alchemy';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { mainnet, polygon, goerli } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import {
  createBrowserRouter, RouterProvider, Route, Routes, createHashRouter,
} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import BuyFromPool from './pages/BuyFromPool';
import SellToPool from './pages/SellToPool';
import Home from './pages/Home';
import MathLib from './pages/MathLib';

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

const router = createHashRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/buy',
    element: <BuyFromPool />,
  },
  {
    path: '/sell',
    element: <SellToPool />,
  },
  {
    path: 'mathlib',
    element: <MathLib />,
  },
]);

function App() {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <RouterProvider router={router} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
