import express from 'express';
import * as companyController from '../controllers/company.controller.js';
import SchemaValidator from "../middlewares/schemaValidator.js";
const validateRequest = SchemaValidator(true);
const router = express.Router();

// add company
router.post('/insertCompany', validateRequest, companyController.insertCompany);

// all companys
router.get('/ListCompanys', companyController.ListCompanys);

/* show */
router.get('/showCompany/:id', companyController.showCompany);

/* update */
router.put('/updateCompany/:id', validateRequest, companyController.updateCompany);

/* Delete */
router.delete('/deleteCompany/:id', companyController.deleteCompany);

export default router;
