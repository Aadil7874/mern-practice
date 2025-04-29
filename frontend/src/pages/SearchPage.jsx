import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Note from "../components/Note";
import Footer from "../components/Footer";
import Oops from "../components/Oops";
import oopsImg from "../assets/Images/oops2.png";
import { useNavigate, useSearchParams } from "react-router-dom";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const myParam = searchParams.get("query");

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    if (myParam) {
      setSearchParams({ query: myParam });
    }
  }, [myParam, setSearchParams]);
  useEffect(() => {
    getNotes();
  }, []);

  // Replace the useEffect for filtering with this updated version
  // Update the filtering useEffect
  useEffect(() => {
    console.log("Current data:", data);
    console.log("Current search param:", myParam);

    if (Array.isArray(data) && myParam) {
      const filtered = data.filter((note) => {
        const title = note.title?.toLowerCase() || "";
        const description = note.description?.toLowerCase() || "";
        const content = note.content?.toLowerCase() || "";
        const searchTerm = myParam.toLowerCase();

        return (
          title.includes(searchTerm) ||
          description.includes(searchTerm) ||
          content.includes(searchTerm)
        );
      });

      console.log("Filtered results:", filtered);
      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }
  }, [data, myParam]);

  // Update the getNotes function to better handle the response
  const getNotes = () => {
    fetch("http://localhost:8000/getNotes", {
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
        console.log("Raw response data:", responseData);

        if (responseData.success === false) {
          setError(responseData.msg);
        } else {
          // Correctly access the notes array from the response
          const notesArray = responseData.notes || [];
          console.log("Setting data to:", notesArray);
          setData(notesArray);
        }
      })
      .catch((error) => {
        console.error("Error fetching notes:", error);
        setError("Failed to fetch notes.");
      });
  };

  return (
    <>
      <Navbar />
      <div className="div flex items-center pr-5 pt-4 justify-end">
        <div className="inputBox !w-[400px] !p-[5px]">
          <input
            type="text"
            placeholder="Search Notes"
            value={myParam || ""}
            onChange={(e) => {
              setSearchParams({ query: e.target.value }, { replace: true });
            }}
            className="!p-[11px] border-b-4 border-b-emerald-500 outline-2 outline-emerald-500"
          />
        </div>
      </div>
      <div className="gridItems gridOne">
        {error ? (
          <Oops
            title={error}
            image={oopsImg}
            buttonTitle="Go Back"
            buttonLink="/"
          />
        ) : !data.length ? (
          <Oops
            title="Loading notes..."
            image={oopsImg}
            buttonTitle="Go Back"
            buttonLink="/"
          />
        ) : !myParam ? (
          <Oops
            title="Please enter a search term"
            image={oopsImg}
            buttonTitle="Go Back"
            buttonLink="/"
          />
        ) : filteredData.length === 0 ? (
          <Oops
            title={`No notes found matching "${myParam}"`}
            image={oopsImg}
            buttonTitle="Go Back"
            buttonLink="/"
          />
        ) : (
          filteredData.map((el, index) => (
            <Note key={el._id} index={index} note={el} height="180px" />
          ))
        )}
      </div>
      <Footer />
    </>
  );
};

export default SearchPage;
