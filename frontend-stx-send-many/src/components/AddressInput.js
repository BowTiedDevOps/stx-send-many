import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { isAddressValid, isAmountValid } from '../utils/helpers';

const AddressInput = ({ addTransaction }) => {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [addressError, setAddressError] = useState(false);
  const [amountError, setAmountError] = useState(false);

  const handleAdd = () => {
    if (isAddressValid(address) && isAmountValid(amount)) {
      addTransaction(address, amount);
      setAddress('');
      setAmount('');
      setAddressError(false);
      setAmountError(false);
    }
  };

  const handleAddressChange = (e) => {
    const value = e.target.value;
    setAddress(value);
    setAddressError(!isAddressValid(value));
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    setAmountError(!isAmountValid(value));
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2} mb={4}>
      <TextField
        label="Recipient Address"
        value={address}
        onChange={handleAddressChange}
        fullWidth
        error={addressError}
        helperText={addressError ? "Invalid address" : ''}
        sx={{ 
          minWidth: '600px',
          maxWidth: '1000px'
        }}
      />
      <TextField
        label={`Amount (STX)`}
        value={amount}
        onChange={handleAmountChange}
        fullWidth
        error={amountError}
        helperText={amountError ? `Invalid amount` : ''}
        sx={{ 
          minWidth: '600px',
          maxWidth: '1000px'
        }}
      />
      <Button
        onClick={handleAdd}
        variant="contained"
        color="primary"
        disabled={addressError || amountError || !address || !amount}
      >
        Add Transaction
      </Button>
    </Box>
  );
};

export default AddressInput;
