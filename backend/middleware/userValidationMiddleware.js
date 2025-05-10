import userValidationSchema from "./userValidationSchema.js";

// Function to validate requests body with the user validation schema
export function userValidationMiddleware(req, res, next) {
  const { error } = userValidationSchema.validate(req.body);

  if (error) {
    const errorMessage = error.details[0].message;
    res.status(400).json({
      error: errorMessage,
    });
  } else {
    next();
  }
}
