const Validator = require("validator");
const isEmpty = require("is-empty");
const strongRegex = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

module.exports = function validateRegisterInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.password = !isEmpty(data.password) ? data.password : ""

// Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }
// Password checks
if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
    
  }
if (!Validator.isLength(data.password, { min: 8, max: 50 } )) {
    errors.password = "Password must be at least 6 characters";
  }

 




return {
    errors,
    isValid: isEmpty(errors)
    
  };
};