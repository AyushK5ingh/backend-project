import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Function to upload file to Cloudinary
const uploadoncloudinary = async (filePath) => {
  try {
    if (!filePath) {
      console.log("File not found at path:", filePath);return null;}
    if (!fs.existsSync(filePath)) {
      console.log("File not found at path:", filePath);
      return null;
    }
    const response = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });
    //file has been uploaded successfully
    console.log("File uploaded successfully", response.url);
    try {
      fs.unlinkSync(filePath);
    } catch (err) {
      console.log("Error deleting local file after upload:", err);
    }
    return response;
  } catch (error) {
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); //delete the file from local storage as the upload failed
      }
    } catch (unlinkError) {
      console.log("Error deleting file in catch block:", unlinkError);
    }
    console.error("Error uploading file to Cloudinary", error);
    return null;
  }
};

export { uploadoncloudinary };

/*
cloudinary.uploader
  .upload(
    "https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg",
    { public_id: "shoes" },
    function (error, result) {
      console.log(result, error);
    },
  )
  .then((result) => console.log(`this is the result ${result}`));

// Upload an image
const uploadResult = await cloudinary.uploader
  .upload(
    "https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg",
    {
      public_id: "shoes",
    },
  )
  .catch((error) => {
    console.log(error);
  });
*/