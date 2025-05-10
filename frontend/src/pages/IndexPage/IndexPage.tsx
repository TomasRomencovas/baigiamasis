import { useNavigate } from "react-router-dom";
import UserList from "../../components/UserList";

export default function IndexPage() {
  const navigate = useNavigate();

  // Setting the main page has a button to add new user or to see all users from UserList
  return (
    <section>
      <header>
        <h1>User Registration</h1>
        <button onClick={() => navigate("/newUser")}>Add New User</button>
      </header>
      <UserList />
    </section>
  );
}
