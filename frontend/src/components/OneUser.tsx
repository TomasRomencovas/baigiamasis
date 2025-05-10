import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

// Using backend link from .env
const API_HOST = import.meta.env.VITE_API_HOST;

// Describing the props that we can get from parent element
type UserPropsType = {
  id: number;
  name: string;
  email: string;
  age: number;
  setRefreshKey: React.Dispatch<React.SetStateAction<number>>;
};

export default function OneUser({
  id,
  name,
  email,
  age,
  setRefreshKey,
}: UserPropsType) {
  const navigate = useNavigate();
  // Setting states for errors and if delete user state is active
  const [errorMessage, setErrorMessage] = useState("");
  const [isDeleteInitiated, setIsDeleteInitiated] = useState(false);

  // Function to delete user from database and update the table with refresh key
  function deleteUserById() {
    axios
      .delete(`${API_HOST}/users/${id}`)
      .then(() => setRefreshKey((prev) => prev + 1))
      .catch((error) => {
        setErrorMessage(error.response.data.error || "Server error");
      });
  }

  // Setting message for display if there was an error with a refresh key
  if (errorMessage) {
    return (
      <tr className="delete-user">
        <td colSpan={3}>{errorMessage}</td>
        <td>
          <button
            onClick={() => {
              setRefreshKey((prev) => prev + 1);
              setErrorMessage("");
            }}
          >
            Retry
          </button>
        </td>
      </tr>
    );
  }

  // Setting confirmation question that is being shown if we initiate users deletion, user can approve or cancel
  if (isDeleteInitiated) {
    return (
      <tr className="delete-user">
        <td colSpan={3}>Are you sure you want to delete {name}?</td>
        <td>
          <button onClick={deleteUserById}>Yes</button>
          <button onClick={() => setIsDeleteInitiated(false)}>No</button>
        </td>
      </tr>
    );
  }

  // Setting year for birth year calculation
  const currentYear = new Date().getFullYear();

  // Setting users information, with actions to update users information or initiate users deletion
  return (
    <tr>
      <td>{name} </td>
      <td> {email} </td>
      <td> {currentYear - age}</td>
      <td>
        <button onClick={() => navigate(`/updateUser/${id}`)}>Edit</button>
        <button onClick={() => setIsDeleteInitiated(true)}>Delete</button>
      </td>
    </tr>
  );
}
