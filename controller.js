const Web3 = require('web3');

async function createAccount(req, res) {
    // Set web3
    const web3 = new Web3(req.body.network && req.body.network === "MAINNET" ? process.env.MAINNET : process.env.TESTNET);

    try {
        let account = await web3.eth.accounts.create();
        res.status(200).send({ status: true, account });
    } catch(error) {
        res.status(500).send({ status: false, message: 'Create Account Failed' });
    }
}

async function getBalance(req, res) {
    // Set web3
    const web3 = new Web3(req.body.network && req.body.network === "MAINNET" ? process.env.MAINNET : process.env.TESTNET);

    try {
        let balance = await web3.eth.getBalance(req.body.address);
        res.status(200).send({ status: true, balance: web3.utils.fromWei(balance, 'ether') });
    } catch(error) {
        res.status(500).send({ status: false, message: 'Create Account Failed' });
    }
}

async function transfer(req, res) {
    // Set web3
    const web3 = new Web3(req.body.network && req.body.network === "MAINNET" ? process.env.MAINNET : process.env.TESTNET);

    try {
        let signTransaction = await web3.eth.accounts.signTransaction({
            to: req.body.to,
            value: web3.utils.toWei(req.body.amount, 'ether'),
            gas: req.body.gas
        }, req.body.from_private_key);

        let tx = await web3.eth.sendSignedTransaction(
            signTransaction.rawTransaction
        );
        
        res.status(200).send({ status: true, hash: tx.transactionHash });
    } catch (error) {
        res.status(500).send({ status: false, message: 'Transfer Failed' });
    }
}

module.exports = {createAccount, getBalance, transfer}

