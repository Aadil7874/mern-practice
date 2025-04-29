import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from "./pages/NoPage";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import "./App.css";
import Profile from "./pages/Profile";
import AddNote from "./pages/AddNote";
import SingleNotePage from "./pages/SingleNotePage";
import EditNote from "./pages/EditNote";
import SearchPage from "./pages/SearchPage";
const initializeTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    document.body.setAttribute("data-theme", savedTheme);
  } else {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const initialTheme = prefersDark ? "dark" : "light";
    localStorage.setItem("theme", initialTheme);
    document.body.setAttribute("data-theme", initialTheme);
  }
};
initializeTheme();
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/addNewNote" element={<AddNote />} />
          <Route path="/singleNotePage/:id" element={<SingleNotePage />} />
          <Route path="/editNote/:id" element={<EditNote />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
