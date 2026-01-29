import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/apierror.js";
import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { uploadoncloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiresponce.js";
import { access } from "fs";
import { response } from "express";

const generateAccessTokenAndRefreshTokenS = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateAccessToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "something went wrong while genersting refresh tpken and acess token"
    );
  }
};
const registerUser = asyncHandler(async (req, res, next) => {
  //get user details from frontend
  //validate the user details
  //check if user already exists username email
  //check for image files avatar
  //upload image to cloudinary avatar
  //create user object create entry in db
  //remove passwprd and refresh token field from responce
  //check for user creation
  // return res

  const { fullname, email, username, password } = req.body;
  console.log("email:", email);
  console.log("fullname", fullname);
  //   if(fullname=="")
  //   {
  //     throw new ApiError(400, "FULLNAME IS REQUIRED")
  //   }

  if (
    [fullname, email, username, password].some((field) => field?.trim() == "")
  ) {
    throw new ApiError(400, "all field IS REQUIRED");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "usr and mail exist");
  }
  console.log(req.files?.avatar[0]?.path);

  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverLocalPath = req.files?.coverImage?.[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Wait avatar is required");
  }

  const avatar = await uploadoncloudinary(avatarLocalPath);
  const coverImage = coverLocalPath
    ? await uploadoncloudinary(coverLocalPath)
    : null;

  if (!avatar) {
    throw new ApiError(400, "avatar is must");
  }

  const user = await User.create({
    fullName: fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const CreatedUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!CreatedUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, CreatedUser, "User Registered Successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  //req body-> data
  //username or email
  //find the user
  //password check
  //access and refresh taoken
  //send cookie

  const { email, username, password } = req.body;
  if (!username || !email) {
    throw new ApiError(400, "username or password is required");
  }

  const user = User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(202, "user does not exist");
  }

  const ispasswordvalid = await user.ispasswordcorrect(password);

  if (!ispasswordvalid) {
    throw new ApiError(401, "Invalid user credentials");
  }
  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefreshTokenS(userId);

  const loggedinuser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedinuser,
          accessToken,
          refreshToken,
        },
        "User loggedin succesfully"
      )
    );
});

const logoutuser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User Logged Out"));
});


export { registerUser, loginUser, logoutuser };
