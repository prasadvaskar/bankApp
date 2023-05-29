const express = require('express');
const router = express.Router();
const {createBank,getAllBanks,createBranch,getAllBranches,createBankAccount,getAllBankAccounts,createTransaction} = require("../Controller/bankController")


router.route('/banks').post(createBank);
router.route('/banks').get(getAllBanks);
router.route('/banks/:bankId/branches').post(createBranch).get(getAllBranches);
router.route('/banks/:branchId/accounts').post(createBankAccount).get(getAllBankAccounts);
router.route('/banks/:accountId/transactions').post(createTransaction);



module.exports = router;