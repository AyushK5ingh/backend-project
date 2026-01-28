import multer from "multer";

// Set up multer storage configuration
// files will be stored in ./public/temp directory
//MULTER IS USED TO HANDLE MULTIPART FORM DATA, WHICH IS USED FOR UPLOADING FILES

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public\temp");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1000);
    cb(null, file.originalname + "-" + uniqueSuffix);
  },
});

export const upload = multer({ storage, });
