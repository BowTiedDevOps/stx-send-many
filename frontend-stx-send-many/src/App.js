import React, { useState } from 'react';
import { Container, Box, AppBar, Toolbar, Select, MenuItem, Typography } from '@mui/material';
import AddressInput from './components/AddressInput';
import TransactionList from './components/TransactionList';
import LoadLockUnlockButtons from './components/LoadLockUnlockButtons';
import ProceedButton from './components/ProceedButton';
import ConnectButton from './components/ConnectButton';
import { saveData, readData } from './utils/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getMempoolTransactionCount } from './utils/helpers';
import { isAuthenticated, connectedAddress } from './components/ConnectButton';
import { makeTransfer } from './utils/makeTransfer';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [isLocked, setIsLocked] = useState(false);
  const [network, setNetwork] = useState('mainnet');
  const [stop, setStop] = useState(false);

  const showSuccess = (message) => {
    toast.success(message, {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const showError = (message) => {
    toast.error(message, {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const addTransaction = (address, amount) => {
    setTransactions([...transactions, { address, amount: parseInt(amount * 1000000) }]);
  };

  const removeTransaction = (index) => {
    setTransactions(transactions.filter((_, i) => i !== index));
  };

  const lockTransactions = async () => {
    setIsLocked(true);
    try {
      await saveData(transactions);
      showSuccess('Successfully saved data');
    } catch (error) {
      showError('Failed to save data');
    }
  };

  const unlockTransactions = async () => {
    setIsLocked(false);
    try {
      const response = await readData();
      setTransactions(response);
      showSuccess('Successfully loaded data');
    } catch (error) {
      showError('Failed to read data');
    }
  };

  const loadTransactions = async () => {
    if (!isLocked) {
      try {
        const response = await readData();
        setTransactions(response);
        showSuccess('Successfully loaded data');
      } catch (error) {
        showError('Failed to read data');
      }
    }
  };

  const proceedTransactions = async () => {
    for (let i = 0; i < transactions.length && !stop; i++) {
      const tx = transactions[i];

      if (!tx) {
        break;
      }

      const mempoolTxCount = await getMempoolTransactionCount(connectedAddress(), network);

      if (!isNaN(mempoolTxCount)) {
        if (mempoolTxCount < 20) {
          try {
            const result = await makeTransfer(network, tx.address, tx.amount);
            if (result === true) {
              const remainingTxs = transactions.slice(i + 1);
              setTransactions(remainingTxs);
              await saveData(remainingTxs);
              showSuccess('Transaction successful');
            } else if (result === false) {
              showError('Transaction cancelled');
              setStop(true);
              break;
            } else {
              showError('Transaction failed');
              setStop(true);
              break;
            }
          } catch (error) {
            showError('Transaction failed');
            setStop(true);
            break;
          }
        } else {
          showError('Mempool tx count limit reached, try again later');
          setStop(true);
          break;
        }
      } else {
        if (mempoolTxCount === false) {
          showError('API rate limit reached, try again later');
          setStop(true);
          break;
        } else {
          showError('Failed to fetch mempool transactions');
          setStop(true);
          break;
        }
      }
    }
    setStop(false);
  };

  return (
    <Container disableGutters maxWidth={false}>
      <ToastContainer />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Send Multiple Transactions
          </Typography>
          <Select
            value={network}
            onChange={(e) => setNetwork(e.target.value)}
            sx={{ color: 'white', marginRight: 2, height: '40px' }}
          >
            <MenuItem value={'mainnet'}>Mainnet</MenuItem>
            <MenuItem value={'testnet'}>Testnet</MenuItem>
            <MenuItem value={'nakamoto-testnet'}>Nakamoto Testnet</MenuItem>
          </Select>
          <ConnectButton network={network} />
        </Toolbar>
      </AppBar>
      {isAuthenticated() &&
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" mt={4}>

          {!isLocked && (
            <AddressInput addTransaction={addTransaction} />
          )}

          <TransactionList transactions={transactions} removeTransaction={removeTransaction} isLocked={isLocked} />

          <LoadLockUnlockButtons 
            loadTransactions={loadTransactions}
            lockTransactions={lockTransactions}
            unlockTransactions={unlockTransactions}
            isLocked={isLocked}
          />

          {isLocked && (
            <ProceedButton proceedTransaction={proceedTransactions} transactionCount={transactions.length} />
          )}
        </Box>
      }
      {!isAuthenticated() &&
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" mt={4}>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Please Connect Your Wallet
          </Typography>
        </Box>
      }
    </Container>
  );
}

export default App;
