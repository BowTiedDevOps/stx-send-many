import React from 'react';
import { Button, Box } from '@mui/material';

const LoadLockUnlockButtons = ({ loadTransactions, lockTransactions, unlockTransactions, isLocked }) => {
  return (
    <Box display="flex" flexDirection="row" justifyContent="center" gap={2} mb={4}>
      <Button
        onClick={loadTransactions}
        variant="contained"
        color="primary"
        disabled={isLocked}
      >
        Load Transactions
      </Button>
      {!isLocked && 
        <Button
          onClick={lockTransactions}
          variant="contained"
          color="primary"
        >
          Lock Transactions
        </Button>
      }
      {isLocked && 
        <Button
          onClick={unlockTransactions}
          variant="contained"
          color="primary"
        >
          Unlock Transactions
        </Button>
      }
    </Box>
  );
};

export default LoadLockUnlockButtons;
