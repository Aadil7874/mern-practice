import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";
import deleteImg from "../assets/Images/delete.png";
import editImg from "../assets/Images/edit.png";
const SingleNotePage = () => {
  let { id } = useParams();
  const [data, setData] = useState(null);

  const navigate = useNavigate();
  const [isDelteModel, setIsDelteModel] = useState(false);

  function getNote() {
    fetch("http://localhost:8000/getNote", {
      mode: "cors",
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        noteID: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }

  const editNote = (id) => {
    navigate(`/editNote/${id}`);
  };

  const delteNote = (id) => {
    console.log("ID : ", id);
    let res = fetch("http://localhost:8000/deleteNote", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ noteID: id }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          // document.getElementById(noteID).remove();
          navigate("/");
        } else {
          alert("Something went wrong");
        }
      })
      .catch((err) => console.log(err));
    setIsDelteModel(false);
  };

  useEffect(() => {
    getNote();
  }, []);
  return (
    <>
      <Navbar />
      <div className="container px-[50px] w-screen min-h-[68vh] h-[auto] !mb-0">
        <div className="flex items-start justify-between h-[auto] my-3">
          <div className="left w-[80% h-full">
            <h3 className="m-0 p-0 text-3xl text-[#000] line-clamp-1 min-w-[90%]">
              {data ? data.title : ""}
            </h3>
            <p className="text-[gray]">
              {data ? new Date(data.date).toDateString() : ""}
            </p>
          </div>
          <div className="right flex items-start gap-1 w-[20%] h-full justify-end">
            <img
              className="w-[30px] h-[30px] cursor-pointer"
              onClick={() => setIsDelteModel(true)}
              src={deleteImg}
              alt=""
            />
            <img
              className="w-[35px] h-[35px] cursor-pointer"
              onClick={() => editNote(id)}
              src={editImg}
              alt=""
            />
          </div>
        </div>

        <p className="text-gray">{data ? data.description : ""}</p>
        <div className="my-3 w-full">{parse(data ? data.content : "")}</div>
      </div>

      {isDelteModel ? (
        <>
          <div className="deleteNoteModalCon flex items-center justify-center flex-col fixed top-0 left-0 w-screen h-screen bg-[rgb(0,0,0,.1)] z-[100]">
            <div className="deleteNoteModalBody relative p-[15px] w-[30vw] h-[20vh] rounded-md bg-[#fff] shadow-lg">
              <h3 className="text-[20px]">
                Delete Note “<span className="text-[#578df5]">Web Design</span>”
              </h3>
              <p className="m-0 p-0 text-[gray] text-[16px] leading-[1]">
                Do You want To Delete This Note <br /> Yes / No
              </p>

              <div className="flex items-center gap-2 absolute bottom-[5%] w-full">
                <button
                  onClick={() => {
                    delteNote(id);
                  }}
                  className="delete min-w-[46%] p-[8px] bg-[#f55757] text-[#fff] border-0 outline-0 cursor-pointer"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    setIsDelteModel(false);
                  }}
                  className="cancel min-w-[46%] p-[8px] bg-[#578df5] text-[#fff] border-0 outline-0 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}

      <Footer />
    </>
  );
};

export default SingleNotePage;
