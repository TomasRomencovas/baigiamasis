import { useNavigate } from "react-router-dom";
import UserForm, { type NewUserType } from "../../components/UserForm";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { ValidationError } from "yup";
import userValidationSchema from "../../validationSchemas/userValidationSchema";

// Using backend link from .env
const API_HOST = import.meta.env.VITE_API_HOST;

export default function NewUserPage() {
  // Setting states for errors and loading state
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  const navigate = useNavigate();

  // Function that takes requests body as an argument, validates it and uses the data to create a new user in the database
  async function registerNewUser(newUser: NewUserType) {
    try {
      setIsLoadingSubmit(true);
      await userValidationSchema.validate(newUser);
      await axios.post(`${API_HOST}/users`, newUser);
      navigate("..");
    } catch (error) {
      // Catching backend errors
      if (error instanceof AxiosError) {
        setErrorMessage(error.response?.data.error || "Server error");
      }
      // Catching frontend validation errors
      else if (error instanceof ValidationError) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Unknown error");
      }
    } finally {
      setIsLoadingSubmit(false);
    }
  }

  // Setting UserForm for registration and displaying errors
  return (
    <section>
      <h1>New User</h1>
      <UserForm
        buttonName={"Register"}
        sendInputData={registerNewUser}
        isLoadingSubmit={isLoadingSubmit}
      />
      {errorMessage && <h2>{errorMessage}</h2>}
      <button onClick={() => navigate(-1)}>Back</button>
    </section>
  );
}
