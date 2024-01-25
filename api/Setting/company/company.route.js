const express = require('express');
const router = express.Router();
const companyController = require('./company.controller');

// add company
router.post('/', companyController.insertCompany);

// all companys
router.get('/', companyController.ListCompanys);

/* show */
router.get('/:sponserId', companyController.showCompany);

/* update */
router.put('/:sponserId', companyController.updateCompany);

/* Delete */
router.delete('/:sponserId', companyController.deleteCompany);

module.exports = router;