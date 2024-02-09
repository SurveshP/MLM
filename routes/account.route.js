import express from 'express';
import * as accountController from '../controllers/account.controller.js';

const router = express.Router();

// add account
router.post('/', accountController.insertAccount);

// all accounts
router.get('/', accountController.ListAccounts);

/* show */
router.get('/:id', accountController.showAccount);

/* update */
router.put('/:id', accountController.updateAccount);

/* Delete */
router.delete('/:id', accountController.deleteAccount);

// Route to get the list of account IDs with userId
router.get('/accounts/:userId', accountController.listAccountsByUserId);

export default router;
