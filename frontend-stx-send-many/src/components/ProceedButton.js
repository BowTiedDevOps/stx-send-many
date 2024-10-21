import React from 'react';
import { Button, Box } from '@mui/material';

const ProceedButton = ({ proceedTransaction, transactionCount }) => {
  return (
    <Box display="flex" justifyContent="center" mt={2}>
      <Button
        onClick={proceedTransaction}
        variant="contained"
        color="primary"
        disabled={transactionCount === 0}
      >
        Send Transaction
      </Button>
    </Box>
  );
};

export default ProceedButton;
