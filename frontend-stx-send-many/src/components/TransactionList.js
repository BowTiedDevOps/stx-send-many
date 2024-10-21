import React from 'react';
import { List, ListItem, ListItemText, IconButton, Box, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TransactionList = ({ transactions, removeTransaction, isLocked }) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%" mb={4}>
      <List sx={{ width: '100%', maxWidth: 600 }}>
        {transactions.map((tx, index) => (
          <ListItem
            key={index}
            secondaryAction={
              !isLocked ?
                <IconButton edge="end" aria-label="delete" onClick={() => removeTransaction(index)}>
                  <DeleteIcon />
                </IconButton> :
                null
            }
          >
            <ListItemText
              primary={`To: ${tx.address}`}
              secondary={`Amount: ${tx.amount / 1000000} STX`}
            />
          </ListItem>
        ))}
      </List>
      {transactions.length === 0 && (
        <Typography variant="subtitle1" color="textSecondary">
          No transactions added.
        </Typography>
      )}
    </Box>
  );
};

export default TransactionList;
