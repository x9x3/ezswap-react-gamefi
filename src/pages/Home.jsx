import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from '../components/Header';

function Home() {
  return (
    <Box sx={{ my: 2 }}>
      <ul>
        <Header />
        <h1>EZ-Swap Pool transaction demo </h1>
        <li><Link to="buy">Buy NFT from pool</Link></li>
        <li><Link to="sell">Sell NFT to pool</Link></li>
        <li><Link to="mathlib">MathLib</Link></li>
      </ul>
    </Box>
  );
}

export default Home;
