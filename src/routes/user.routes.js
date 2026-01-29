import { Router } from "express";
import { registerUser,loginUser,logoutuser } from "../controllers/user.controllers.js";
import { upload } from "../midlewares/multer.midleware.js";
import {verifyJWT} from "../midlewares/auth.middleware.js"
const routes = Router();

routes.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);
// routes.route("/login").post(login);

Router.route("/login").post(loginUser)

//secured routes
Router.route("/logut".post(verifyJWT, logoutuser))



export default routes;
