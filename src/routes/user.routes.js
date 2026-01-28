import { Router } from "express";
import { registerUser } from "../controllers/user.controlLer.js";

const routes = Router();

routes.route("/register").post(registerUser);
// routes.route("/login").post(login);

export default routes;
