import Joi from "joi";

const registerUserValidation = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required().messages({
    "string.base": "Username must be a text.",
    "string.alphanum": "Username can only contain letters and numbers.",
    "string.empty": "Username cannot be empty.",
    "string.min": "Username must have at least {#limit} characters.",
    "string.max": "Username cannot exceed {#limit} characters.",
    "any.required": "Username is required.",
  }),

  email: Joi.string()
    .email()
    .pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/i)
    .required()
    .messages({
      "string.base": "Email must be a text.",
      "string.pattern.base" : "Email must be a Gmail address (example@gmail.com)",
      "string.email": "Email must end with .com and be in a valid format.",
      "string.empty": "Email cannot be empty.",
      "any.required": "Email is required.",
    }),

  name: Joi.string()
    .pattern(/^[A-Za-z\s]+$/)
    .min(3)
    .max(50)
    .required()
    .messages({
      "string.base": "Name must be a text.",
      "string.empty": "Name cannot be empty.",
      "string.pattern.base": "Name can only contain letters and spaces.",
      "string.min": "Name must have at least {#limit} characters.",
      "string.max": "Name cannot exceed {#limit} characters.",
      "any.required": "Name is required.",
    }),

  password: Joi.string()
    .min(8)
    .max(128)
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"))
    .required()
    .messages({
      "string.base": "Password must be a text.",
      "string.empty": "Password cannot be empty.",
      "string.min": "Password must have at least {#limit} characters.",
      "string.max": "Password cannot exceed {#limit} characters.",
      "string.pattern.base":
        "Password must contain an uppercase letter, a lowercase letter, a number, and a symbol (!@#$%^&*).",
      "any.required": "Password is required.",
    }),

  passwordConfirmation: Joi.string()
    .required()
    .valid(Joi.ref("password"))
    .messages({
      "any.only": "Password confirmation must match the password.",
      "string.empty": "Password confirmation cannot be empty.",
      "any.required": "Password confirmation is required.",
    }),
});

const loginUserValidation = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: ["com"] } })
    .required()
    .messages({
      "string.base": "Email must be a text.",
      "string.email": "Email must end with .com and be in a valid format.",
      "string.empty": "Email cannot be empty.",
      "any.required": "Email is required.",
    }),

  password: Joi.string()
    .min(8)
    .max(128)
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"))
    .required()
    .messages({
      "string.base": "Password must be a text.",
      "string.empty": "Password cannot be empty.",
      "string.min": "Password must have at least {#limit} characters.",
      "string.max": "Password cannot exceed {#limit} characters.",
      "string.pattern.base":
        "Password must contain an uppercase letter, a lowercase letter, a number, and a symbol (!@#$%^&*).",
      "any.required": "Password is required.",
    }),
});

const reviewValidation = Joi.object({
  rating: Joi.number().integer().min(1).max(5).required().messages({
    "any.required": "Rating is required",
  }),
  review_text: Joi.string().min(0).max(1000).required().messages({
    "string.empty": "Review text cannot be empty.",
    "any.required": "Review text is required",
    "string.min": "Review text must have at least {#limit} characters.",
    "string.max": "Review text cannot exceed {#limit} characters.",
  }),
});

export default { registerUserValidation, loginUserValidation , reviewValidation};
