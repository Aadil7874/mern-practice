import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Note from "../components/Note";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [userDetails, setuserDetails] = useState(null);
  const [notes, setNotes] = useState(null);
  const [importantNotes, setImportantNotes] = useState(null);
  const [normalNotes, setNormalNotes] = useState(null);

  const navigate = useNavigate();

  function getUserDetails() {
    fetch("http://localhost:8000/getUserDetails", {
      mode: "cors",
      method: "POST",
      headers: {
        "Applicatiosn-Type": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userID: localStorage.getItem("userID") }),
    })
      .then((res) => res.json())
      .then((data) => {
        setuserDetails(data);
      });
  }

  function getNotes() {
    fetch("http://localhost:8000/getNotes", {
      mode: "cors",
      method: "POST",
      headers: {
        "Applicatiosn-Type": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userID: localStorage.getItem("userID") }),
    })
      .then((res) => res.json())
      .then((data) => {
        const notesData = data.notes;
        setNotes(notesData);

        setImportantNotes(notesData.filter((note) => note.isImportant));

        setNormalNotes(notesData.filter((note) => note.isImportant == false));
      });
  }

  useEffect(() => {
    getUserDetails();
    getNotes();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row items-center justify-between w-full min-h-[200px] md:h-[300px] px-4 md:px-[50px] py-6 md:py-0 space-y-6 md:space-y-0">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-[10px]">
          <div className="profileCircle w-[100px] h-[100px] md:w-[150px] md:h-[150px] rounded-full bg-[#d9d9d9]"></div>
          <div className="text-center md:text-left">
            <h3 className="text-xl md:text-[23px] font-semibold">
              {userDetails ? userDetails.name : ""}
            </h3>
            <p className="text-sm md:text-[15px] text-gray-500 mt-1 md:-mt-1">
              Joined In{" "}
              {userDetails ? new Date(userDetails.date).toDateString() : ""}
            </p>
          </div>
        </div>

        <div className="relative w-full md:w-auto h-auto md:h-[40%]">
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-2 md:gap-[10px] text-gray-500 text-sm md:text-base">
            <span>Total Notes: {notes ? notes.length : ""}</span>
            <span className="hidden md:inline">|</span>
            <span>
              Important Notes: {importantNotes ? importantNotes.length : ""}
            </span>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-3 md:gap-[10px] mt-4 md:mt-0 md:absolute md:bottom-0">
            <button className="btnNormal w-full md:w-auto">Add Pic</button>
            <button
              className="btnNormal w-full md:w-auto"
              onClick={() => {
                navigate("/addNewNote");
              }}
            >
              Add Note
            </button>
          </div>
        </div>
      </div>
      <div className="w-screen px-[50px]">
        <h3 className="text-[26px]">
          Your <span style={{ color: "#578df5" }}>Important</span> Notes
        </h3>
      </div>
      <div className="gridItems">
        {importantNotes
          ? importantNotes.map((note, index) => {
              return <Note key={note._id} note={note} index={index} />;
            })
          : ""}
      </div>

      <div className="w-screen px-[50px] mt-4">
        <h3 className="text-[26px]">
          Your <span style={{ color: "#578df5" }}>Normal</span> Notes
        </h3>
      </div>
      <div className="gridItems mb-3">
        {normalNotes
          ? normalNotes.map((note, index) => {
              return <Note key={note._id} note={note} index={index} />;
            })
          : ""}
      </div>

      <Footer />
    </>
  );
};

export default Profile;
