import { Link } from 'react-router-dom';

function Home() {
  return (
    <ul>
      <h1>EZ-Swap Pool transaction demo </h1>
      <li><Link to="buy">Buy NFT from pool</Link></li>
      <li><Link to="sell">Sell NFT to pool</Link></li>
      <li><Link to="mathlib">MathLib</Link></li>
    </ul>
  );
}

export default Home;
