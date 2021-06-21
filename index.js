const express = require('express')
const { transfer, createAccount, getBalance, transferToken, getTokenBalance } = require('./controller')
const app = express()
app.use(express.json());

require('dotenv').config()

const port = process.env.PORT

app.get('/', (req, res) => {
  res.send('BSC API')
})

app.post('/account', (req, res) => createAccount(req, res));
// BNB related api
app.post('/balance', (req, res) => getBalance(req, res));
app.post('/transfer', (req, res) => transfer(req, res));
// Token related api
app.post('/token/balance', (req, res) => getTokenBalance(req, res));
app.post('/token/transfer', (req, res) => transferToken(req, res));

app.listen(port, () => {
  console.log(`Server running in port:${port}`)
})