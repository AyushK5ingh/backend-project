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
    if (!fs.existsSync(filePath)) {
      throw new Error("File does not exist");
      return null;
    }
    const responce = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });
    //file has been uploaded successfully
    console.log("File uploaded successfully", responce.url);
    return responce;
  } catch (error) {
    fs.unlinkSync(filePath); //delete the file from local storage as the upload failed
    console.error("Error uploading file to Cloudinary", error);
    throw error;
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