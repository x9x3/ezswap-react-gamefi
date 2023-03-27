import {
  Box, Stack, Typography,
} from '@mui/material';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <Stack flexDirection="row" justifyContent="space-between">
      <Stack flexDirection="row" rowGap={2} columnGap={2} my={2} mx={4}>
        <Typography variant="h5">EZ-Swap</Typography>
        <Link to="/mathlib">MathLib</Link>
        <Link to="/sell">Sell NFT to pool</Link>
        <Link to="/buy">Buy NFT from pool</Link>
      </Stack>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          mr: 2,
          my: 2,
        }}
      >
        <ConnectButton />
      </Box>
    </Stack>
  );
}

export default Header;
