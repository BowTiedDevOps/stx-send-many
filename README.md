# STX Send Many

This application allows you to input multiple transactions and send them 1 by 1 with a click of a button.

If you have a batch transaction as csv, you can load it by creating a file named `data.csv` in `backend-stx-send-many` subfolder and providing the csv data inside:

```bash
nano backend-stx-send-many/cache.csv

# The address is the Stacks address of the user to send to.
# The amount is the amount to send to that address in microstacks (uSTX), where 1000000 represents 1 STX.
# The file content must look like this:
#
# "address","amount"
# "ST3E...","5000000"
# "ST3R...","10125000"
# "ST1B...","15123456"
```

### Step 1: Installing the required packages

In 2 different terminals, install the required npm libraries:

**Backend:**

```bash
# Terminal 1
cd backend-stx-send-many
npm i
```

**Frontend:**

```bash
# Terminal 2
cd frontend-stx-send-many
npm i
```

### Step 2: Running the applications

In 2 different terminals, run the applications (backend is optional, but you won't be able to save and read saved data without it):

**Backend:**

```bash
# Terminal 1
cd backend-stx-send-many
node server.js
```

**Frontend:**

```bash
# Terminal 2
cd frontend-stx-send-many
npm start
```

The frontend will now be available at `localhost:3000` (or `localhost:3001` if port `3000` is used), and you can connect your Leather / Xverse / Asigna wallets, then start sending transactions.
