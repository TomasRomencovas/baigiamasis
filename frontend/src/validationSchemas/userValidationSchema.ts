import * as Yup from "yup";

// Using yup to validate user input
const userValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters long")
    .max(120, "Name must be no more than 120 characters long")
    .required("Name is required"),

  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),

  // Using transform to make an existing value to a number, if no value is given leave it empty, so that it would not become 0 by default
  age: Yup.number()
    .transform((_, val) => (val === "" ? undefined : Number(val)))
    .typeError("Age must be a number")
    .min(0, "Age cannot be less than 0")
    .max(120, "Age cannot be more than 120")
    .required("Age is required"),
});

export default userValidationSchema;
