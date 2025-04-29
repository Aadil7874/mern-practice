import express from "express";
import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import noteModel from "../models/noteModel.js";

let secret = "secret";
const router = express.Router();

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/signup", async (req, res) => {
  let { username, name, email, password } = req.body;

  let emailIcon = await userModel.findOne({ email });

  if (emailIcon) {
    return res.json({
      success: false,
      message: "Email already exists",
    });
  } else {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        let user = await userModel.create({
          username,
          name,
          email,
          password: hash,
        });

        const token = jwt.sign({ email: user.email, userID: user._id }, secret);
        res.json({
          success: true,
          userID: user._id,
          message: "User created successfully",
          token,
        });
      });
    });
  }
});

router.post("/login", async (req, res) => {
  let { email, password } = req.body;

  let user = await userModel.findOne({ email });
  if (user) {
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        var token = jwt.sign({ email: user.email, userID: user._id }, secret);
        res.json({
          success: true,
          userID: user._id,
          message: "User logged in successfully",
          token: token,
        });
      } else {
        res.json({
          success: false,
          message: "Password is incorrect",
        });
      }
    });
  } else {
    return res.json({
      success: false,
      message: "Email Id Not Exist !",
    });
  }
});

router.post("/getNotes", async (req, res) => {
  let notes = await noteModel.find({ uploadedBy: req.body.userID });
  if (notes.length > 0) {
    res.json({
      success: true,
      notes,
      message: "Notes Found"
    });
  } else {
    res.json({
      success: false,
      message: "No Notes Found",
    });
  }
});

router.post("/addNote", async (req, res) => {
  let { title, description, content, isImportant, uploadedBy } = req.body;

  let note = noteModel.create({
    title,
    description,
    content,
    isImportant,
    uploadedBy,
  });

  res.json({
    success: true,
    noteID: note._id,
    userID: uploadedBy,
    message: "Note Added Successfully",
  });
});

router.post("/deleteNote", async (req, res) => {
  let { noteID } = req.body;
  // Find the note
  let note = await noteModel.findOne({ _id: noteID });
  console.log("Note found:", note);

  if (!note) {
    return res.status(404).json({ success: false, message: "Note not found" });
  }

  // Add deletion logic if needed
  await noteModel.deleteOne({ _id: noteID });

  res.json({
    success: true,
    message: "Note Deleted Successfully",
    deletedNote: note._id,
  });
});

router.post("/updateNote", async (req, res) => {
  try {
    let { noteID, title, description, content, isImportant, uploadedBy } =
      req.body;
    if (!noteID)
      return res
        .status(400)
        .json({ success: false, message: "noteID is required" });

    let note = await noteModel.findOne({ _id: noteID });
    if (!note)
      return res
        .status(400)
        .json({ success: false, message: "Note not Found" });

    await noteModel.updateOne(
      { _id: noteID },
      { title, description, content, isImportant, uploadedBy }
    );
    res.json({
      success: true,
      message: "Note updated Successfully",
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred",
    });
  }
});
router.post("/getNote", async (req, res) => {
  let { noteID } = req.body;
  let note = await noteModel.findOne({ _id: noteID });
  console.log(note)
  if (note) {
    res.json(note);
  }
  else {
    res.json({
      success: false,
      msg: "No Note Found !"
    })
  }
});



// router.post("/getNotes", async (req, res) => {
//   let notes = await noteModel.find({ uploadedBy: req.body.userId });
//   console.log(notes)
//   if (notes.length > 0) {
//     res.json(notes);
//   }
//   else {
//     res.json({
//       success: false,
//       msg: "No Notes Found !"
//     })
//   }
// });

// apis for users

router.post("/getUserDetails", async (req, res) => {
  let { userID } = req.body;
  let user = await userModel.findOne({ _id: userID });
  if (user) {
    res.json(user);
  }
  else {
    res.json({
      success: false,
      msg: "No User Found !"
    });
  }
})

export default router;
