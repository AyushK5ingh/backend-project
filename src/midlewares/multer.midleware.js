import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up multer storage configuration
// files will be stored in ./public/temp directory
//MULTER IS USED TO HANDLE MULTIPART FORM DATA, WHICH IS USED FOR UPLOADING FILES

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,  "./public/temp");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1000);
    cb(null, file.originalname,"+",uniqueSuffix);
  },
});

export const upload = multer({ storage });
