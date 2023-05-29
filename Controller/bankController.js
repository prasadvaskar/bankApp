const asyncHandler = require('express-async-handler');
const {json} = require('body-parser');
const {Bank,BankAccount,Branch,Transaction } = require('../Model/bankModel');
const expressAsyncHandler = require('express-async-handler');


//@desc create Bank 
//@router post /bank
//public
const createBank = asyncHandler( async (req,res)=>{

    try{
        const { name } = req.body;
        const bank = await Bank.create({name})
        res.status(201).json(bank);
    }
    catch(err){
        res.status(500).json({error : 'Failed to create bank'});
    }
})

//@desc get all banks 
//@router get /bank
//public

const getAllBanks = asyncHandler(async (req,res)=>{
    try{
        const banks = await Bank.find();
        res.json(banks);
    }catch(err){
        res.status(500).json({error : "Failed to retrieve bank details"});
    }
})

//@ create Branch
//@router post /banks/:bankId/branches
//public

const createBranch = asyncHandler(async (req,res)=>{
    try{
        const {bankId} = req.params;
        const {name,address} = req.body;
        const branch = await Branch.create({name,address});

        //Update Branch with new branch
        const bank = await Bank.findByIdAndUpdate(
            bankId,
            {$push : {branches : branch._id}},
            {new : true}
        );
        res.status(201).json({bank,branch})
    }catch(err){
        res.status(500).json({error:'Failed to create a new Branch'});
    }
})



//@ get all branches under a bank
//@router get /banks/:bankId/branches
//public

const getAllBranches  = asyncHandler(async (req,res)=>{
    try{
        const {bankId} = req.params;
        const bank = await Bank.findById(bankId).populate('branches');
        res.json(bank.branches);
    }catch(err){
        res.status(500).json({error:'Failed to retrieve branches'});
    }
})


//@ create a bank account under a brach
//@router post /banks/:branchId/accounts
//public

const createBankAccount = async (req, res) => {
    try {
        const { branchId } = req.params;
        const { accountNumber, accountHolder } = req.body;
        const account = await BankAccount.create({ accountNumber, accountHolder, branch: branchId });

      // Update the branch with the new account
        const branch = await Branch.findByIdAndUpdate(
        branchId,
        { $push: { accounts: account._id } },
        { new: true }
        );

        res.status(201).json({ branch, account });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create a new bank account' });
    }
};




//@ get all accounts under a branch
//@router get /banks/:branchId/accounts
//public

const getAllBankAccounts = asyncHandler(async (req,res)=>{
    try{
        const {branchId} = req.params;
        const branch = await Branch.findById(branchId).populate('accounts');
        res.json(branch.accounts);
    }catch(err){
        res.status(500).json({error:'Failed to retrieve bank accounts'});
    }
})


//@post create a transaction at bank account
//@router post /banks/:accountId/transactions
//public

const createTransaction = async (req, res) => {
    try {
      const { accountId } = req.params;
      const { description, amount } = req.body;
      const transaction = await Transaction.create({ description, amount, account: accountId });
  
      // Update the bank account with the new transaction
      const account = await BankAccount.findByIdAndUpdate(
        accountId,
        { $push: { transactions: transaction._id } },
        { new: true }
      );
  
      res.status(201).json({ account, transaction });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create a new transaction' });
    }
  };

module.exports = {createBank,getAllBanks,createBranch,getAllBranches,createBankAccount,getAllBankAccounts,createTransaction};
