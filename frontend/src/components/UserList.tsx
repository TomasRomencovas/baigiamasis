import axios from "axios";
import { useEffect, useState } from "react";
import OneUser from "./OneUser";

// Using backend link from .env
const API_HOST = import.meta.env.VITE_API_HOST;

// Describing the data that we get from backend "user"
export type UserType = {
  id: number;
  name: string;
  email: string;
  age: number;
};

export default function UserList() {
  // Setting states for all users, errors, loading state and a refresh key
  const [users, setUsers] = useState<UserType[] | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  // Retrieving user data from backend on page load or after using a refresh key
  useEffect(() => {
    axios
      .get(`${API_HOST}/users`)
      .then((response) => {
        setUsers(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error.response.data.error || "Server error");
        setIsLoading(false);
      });
  }, [refreshKey]);

  // Setting message for display if data is loading
  if (isLoading) {
    return <h2>Loading Users...</h2>;
  }

  // Setting message for display if there was an error with a refresh key
  if (errorMessage) {
    return (
      <>
        <h2>{errorMessage}</h2>
        <button onClick={() => setRefreshKey((prev) => prev + 1)}>Retry</button>
      </>
    );
  }

  // Setting message for display if there are no user
  if (users === null || users.length === 0) {
    return <h2>No users found</h2>;
  }

  // Setting a table that shows all users information, every user is displayed from OneUser
  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Birth Year</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <OneUser
            key={user.id}
            id={user.id}
            name={user.name}
            email={user.email}
            age={user.age}
            setRefreshKey={setRefreshKey}
          />
        ))}
      </tbody>
    </table>
  );
}
