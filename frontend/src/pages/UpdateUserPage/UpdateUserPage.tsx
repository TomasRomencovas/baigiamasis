import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { NewUserType } from "../../components/UserForm";
import userValidationSchema from "../../validationSchemas/userValidationSchema";
import axios, { AxiosError } from "axios";
import { ValidationError } from "yup";
import UserForm from "../../components/UserForm";
import type { UserType } from "../../components/UserList";

// Using backend link from .env
const API_HOST = import.meta.env.VITE_API_HOST;

export default function UpdateUserPage() {
  const { userId } = useParams();
  // Setting states for user, loading state, submit button loading state and errors
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  // Retrieving user data from backend on page load
  useEffect(() => {
    axios
      .get(`${API_HOST}/users/${userId}`)
      .then((response) => {
        setUser(response.data);
        setIsLoadingUser(false);
      })
      .catch((error) => {
        setErrorMessage(error.response.data.error || "Server error");
        setIsLoadingUser(false);
      });
  }, [userId]);

  // Function that takes requests body as an argument, validates it and uses the data to update an existing user in the database
  async function updateExistingUser(newUser: NewUserType) {
    try {
      setIsLoadingSubmit(true);
      await userValidationSchema.validate(newUser);
      await axios.put(`${API_HOST}/users/${userId}`, newUser);
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

  // Setting message for display if data is loading
  if (isLoadingUser) {
    return <h2>Loading User...</h2>;
  }

  // Setting message for display if there are no user
  if (!user) {
    return (
      <div>
        <h2>No users found</h2>
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
    );
  }

  // Setting UserForm for user update and displaying errors
  return (
    <section>
      <h1>Edit User Details</h1>
      <UserForm
        buttonName={"Update"}
        nameValue={user?.name}
        emailValue={user?.email}
        ageValue={user?.age}
        sendInputData={updateExistingUser}
        isLoadingSubmit={isLoadingSubmit}
      />
      {errorMessage && <h2>{errorMessage}</h2>}
      <button onClick={() => navigate(-1)}>Back</button>
    </section>
  );
}
