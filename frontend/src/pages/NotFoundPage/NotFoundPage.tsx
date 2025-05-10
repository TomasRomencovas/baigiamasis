import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  // Setting the unknown page for information and adding a back button
  return (
    <div>
      <h2>Page not found</h2>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}
