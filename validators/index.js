import { validateCreateCompany, validateUpdateCompany } from "./company.validator.js";
import { validateCreateUser, validateUpdateUser } from "./user.validator.js";

export const validators = {
  "/userInsert": validateCreateUser,
  "/updateUser/:sponserId": validateUpdateUser,
  "/insertCompany": validateCreateCompany,
  "/updateCompany/:id": validateUpdateCompany,
};