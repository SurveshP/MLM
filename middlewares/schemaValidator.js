import _ from "lodash";
import Joi from "joi";
import { validators } from "../validators/index.js";

const validationMiddleware = (useJoiError = false) => {
  const _useJoiError = _.isBoolean(useJoiError) && useJoiError;
  const _supportedMethods = ["post", "put"];
  const _validationOptions = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  };

  return (req, res, next) => {
    const route = req.route.path;
    const method = req.method.toLowerCase();

    if (_supportedMethods.includes(method) && _.has(validators, route)) {
      const _schema = _.get(validators, route);

      if (_schema) {
        Joi.validate(
          _.isEmpty(req.body) ? req.query : req.body,
          _schema,
          _validationOptions,
          (err, data) => {
            if (err) {
              const JoiError = {
                success: false,
              message:err.details[0].message.replace(/['"]/g, ''),
              };
              const CustomError = {
                status: "failed",
                message:
                  "Invalid request data. Please review request and try again.",
              };

              res.status(400).json(_useJoiError ? JoiError : CustomError);
            } else {
              req.body = data;
              next();
            }
          }
        );
      }
    }
  };
};

export default validationMiddleware;