import { Box } from '@mui/material';
import { ConnectButton } from '@rainbow-me/rainbowkit';

function Header() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <ConnectButton />
    </Box>
  );
}

export default Header;
