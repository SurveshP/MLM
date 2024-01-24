const express = require('express');
const router = express.Router();
const companyController = require('./company.controller');

// add company
router.post('/', companyController.insertCompany);

// all companys
router.get('/', companyController.ListCompanys);

/* show */
router.get('/:id', companyController.showCompany);

/* update */
router.put('/:id', companyController.updateCompany);

/* Delete */
router.delete('/:id', companyController.deleteCompany);

module.exports = router;