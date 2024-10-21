import React, { useState } from 'react';
import { Button, Box } from '@mui/material';
import { userSession } from '../utils/userSession';
import { showConnect } from '@stacks/connect';

const appName = 'Send Multiple Transactions';
const appIcon = '../public/logo.png';

const login = () => {
  showConnect({
    userSession,
    appDetails: {
      name: appName,
      icon: appIcon,
    },
    onFinish: () => {
      window.location.reload();
    },
    onCancel: () => {
      console.log('Cancelled');
    },
  });
};

const logout = () => {
  userSession.signUserOut("/");
};

export const isAuthenticated = () => 
  userSession ? 
    userSession.isUserSignedIn() : 
    false;

export const connectedAddress = (network) => 
  isAuthenticated() && userSession ? 
    network === "mainnet" ? 
      userSession.loadUserData().profile.stxAddress.mainnet : 
      userSession.loadUserData().profile.stxAddress.testnet : 
    null

const ConnectButton = ({ network }) => {
  const [hover, setHover] = useState(false);
  const address = connectedAddress(network);

  return (
    <Box display="flex" justifyContent="center" sx={{ height: '40px' }}>
      {!isAuthenticated() && 
        <Button
          onClick={() => login()}
          variant="contained"
          color="primary"
        >
          Connect Wallet
        </Button>
      }
      {isAuthenticated() && 
        <Button
          variant="contained"
          color="primary"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={logout}
        >
          {hover ? 'Disconnect' : `${address.slice(0, 4)}...${address.slice(address.length - 4)}`}
        </Button>
      }
    </Box>
  );
};

export default ConnectButton;