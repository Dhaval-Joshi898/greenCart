import multer from "multer";
import path from "path";

// create a local folder named 'uploads' in your backend project
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // folder to temporarily store files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  },
});

export const upload = multer({ storage });
  
  // import multer from "multer";

    // export const upload=multer({storage:multer.diskStorage({})})