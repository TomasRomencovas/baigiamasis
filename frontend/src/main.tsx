import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage/IndexPage.tsx";
import NewUserPage from "./pages/NewUserPage/NewUserPage.tsx";
import UpdateUserPage from "./pages/UpdateUserPage/UpdateUserPage.tsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.tsx";

// Creating the routes for the 3 existing pages and if user navigates elsewhere
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<IndexPage />} />
        <Route path="/newUser" element={<NewUserPage />} />
        <Route path="/updateUser/:userId" element={<UpdateUserPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
