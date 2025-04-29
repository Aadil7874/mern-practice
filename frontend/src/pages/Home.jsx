import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Note from "../components/Note";
import Footer from "../components/Footer";
import Oops from "../components/Oops";
import oopsImage from "../assets/Images/oops2.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [userData, setUserData] = useState(null);

  // Update the getNotes function
  let getNotes = () => {
    let res = fetch("http://localhost:8000/getNotes", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID: localStorage.getItem("userID"),
      }),
    })
      .then((resp) => resp.json())
      .then((responseData) => {
        if (responseData.success === false) {
          setError(responseData.msg);
        } else {
          setData(responseData.notes); // Set data to the notes array
          console.log("Notes array:", responseData.notes);
        }
      });
  };

  function getUserDetails() {
    console.log("getUserDetails from Home component: triggered");
    fetch("http://localhost:8000/getUserDetails", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID: localStorage.getItem("userID"),
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
    getNotes();
    getUserDetails();
  }, []);

  return (
    <>
      <Navbar />
      <div className="mt-5 flex items-center justify-between w-screen px-[50px]">
        <h1 className="text-2xl">
          {userData ? "Hi " + userData.name : "Welcome to Keep Notes"}
        </h1>

        <div className="inputBox !w-[380px]">
          <input
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                navigate(`/search?query=${query}`);
              }
            }}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            value={query}
            type="text"
            placeholder="Search Notes"
            className=" !p-[11px] border-b-4 border-b-emerald-500 outline-2 outline-emerald-500"
          />
        </div>
      </div>

      <div className="gridItems">
        {/* =========== Mock Notes ============ */}
        {/* <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note /> */}
        {data && data.length > 0 ? (
          data.map((el, index) => (
            <Note key={el._id || index} index={index} note={el} />
          ))
        ) : (
          <Oops
            title={"No Notes Found"}
            image={oopsImage}
            buttonTitle={"Add Note"}
            buttonLink={"/addNewNote"}
          />
        )}
      </div>

      <Footer />
    </>
  );
};

export default Home;
