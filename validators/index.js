import { validateCreateAdmin, validateUpdateAdmin } from "./admin.validator.js";
import { validateCreateUser, validateUpdateUser } from "./user.validator.js";

export const validators = {
  "/userInsert": validateCreateUser,
  "/updateUser/:sponserId": validateUpdateUser,
  "/insertAdmin": validateCreateAdmin,
  "/updateAdmin/:id": validateUpdateAdmin,
};