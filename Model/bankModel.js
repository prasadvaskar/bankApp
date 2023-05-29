const mongoose = require('mongoose');

  // Define the schema for a banmk
const bankSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    branches: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch'
    }]
});


  // Define the schema for a branch
const branchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    accounts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BankAccount'
    }]
});

// Define the schema for a bank account
const bankAccountSchema = new mongoose.Schema({
    accountNumber: {
        type: String,
        required: true,
        unique: true
    },
    accountHolder: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    },
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch'
    },
    transactions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction'
    }]
});


// Define the schema for a transaction
const transactionSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BankAccount'
    }
});

// Create the Bank model using the bankSchema
const Bank = mongoose.model('Bank', bankSchema);

// Create the Branch model using the branchSchema
const Branch = mongoose.model('Branch', branchSchema);

// Create the BankAccount model using the bankAccountSchema
const BankAccount = mongoose.model('BankAccount', bankAccountSchema);

// Create the Transaction model using the transactionSchema
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = {Bank,Branch,BankAccount,Transaction};