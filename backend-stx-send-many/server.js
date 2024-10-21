const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const { Parser } = require('json2csv');
const csv = require('csv-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post('/save', (req, res) => {
  const data = req.body;

  if (!Array.isArray(data)) {
    return res.status(400).json({ message: 'Invalid data format. Expected an array of objects.' });
  }

  const json2csvParser = new Parser({ fields: ['address', 'amount'] });
  const csvData = json2csvParser.parse(data);

  const csvFilePath = path.join(__dirname, 'data.csv');
  fs.writeFile(csvFilePath, csvData, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to save CSV data' });
    }
    res.status(200).json({ message: 'Data saved successfully as CSV' });
  });
});

app.get('/read', (_, res) => {
  const csvFilePath = path.join(__dirname, 'data.csv');
  const jsonArray = [];

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row) => {
      jsonArray.push(row);
    })
    .on('end', () => {
      res.status(200).json(jsonArray);
    })
    .on('error', (err) => {
      return res.status(500).json({ message: 'Failed to read CSV data' });
    });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
