import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  // --------------------- < t h e m e ---------------------
  const [theme, setTheme] = useState(() => {
    // Get theme from localStorage or use system preference as fallback
    return (
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
    );
  });

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.setAttribute("data-theme", newTheme);
  };

  useEffect(() => {
    // Apply theme on component mount and theme changes
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  // --------------------- t h e m e /> ---------------------

  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);

  function getUserDetails() {
    fetch("http://localhost:8000/getUserDetails", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userID"),
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.success === false) {
          navigate("/login");
        } else {
          setUserData(data);
        }
      });
  }

  useEffect(() => {
    getUserDetails();
  }, []);

  function getUserDetails() {
    console.log("getUserDetails from navbar component: triggered");

    // fetch("http://localhost:8000/getUserDetails", {
    //   mode: "cors",
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     userId: localStorage.getItem("userID"),
    //   }),
    // })
    //   .then((resp) => resp.json())
    //   .then((data) => {
    //     if (data.success === false) {
    //       navigate("/login");
    //     } else {
    //       setUserData(data);
    //     }
    //   });
  }

  function navToHome() {
    navigate("/");
  }

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <>
      <div className="navbar w-screen h-[90px] px-[50px] flex items-center justify-between">
        <div className="logo text-2xl z-4 cursor-pointer " onClick={navToHome}>
          Keep Notes
        </div>

        <div className="right flex items-center gap-[20px]">
          <button
            className="btnNormal"
            onClick={() => {
              navigate("/addNewNote");
            }}
          >
            Add Note
          </button>
          <nav className="p-4 w-full relative">
            <button
              className="body-theme-toggle cursor-pointer px-4 py-2 rounded-md 
    transition-all duration-300 ease-in-out
    hover:bg-gray-100 dark:hover:bg-gray-800 
    hover:shadow-md hover:-translate-y-0.5
    hover:text-black
    active:translate-y-0 active:shadow-sm
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              onClick={toggleTheme}
            >
              {theme === "light" ? "🌙 dark" : "☀️ light"}
            </button>
          </nav>

          <div className="profileCircle w-[40px] cursor-pointer h-[40px] rounded-[50%] bg-[#D9D9D9]">
            <button
              onClick={() => {
                navigate("/profile");
              }}
              name={userData ? userData.username : ""}
              size="50"
              round="50%"
              style={{ cursor: "pointer" }}
              className="body-theme-toggle cursor-pointer px-4 py-2 rounded-md 
    transition-all duration-300 ease-in-out
    hover:bg-gray-100 dark:hover:bg-gray-800 
    hover:shadow-md hover:-translate-y-0.5
    hover:text-black
    active:translate-y-0 active:shadow-sm
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              {" "}
              Profile{" "}
            </button>
          </div>
        </div>
      </div>
      <hr className="text-blue-300" />
    </>
  );
};

export default Navbar;
