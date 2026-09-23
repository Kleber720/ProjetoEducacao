import { Router } from "express";
import userController from "../controller/userController";

const routerUser= Router();

routerUser.post("/users", userController.createUser);
routerUser.get("/users/list", userController.searchUser);
routerUser.get("/users/id", userController.searchUserById);
routerUser.get("/users/email", userController.searchUserByEmail);
routerUser.get("/users/name", userController.searchUserByName);
routerUser.delete("/users/delete", userController.deleteUserById);
routerUser.put("/users/update", userController.updateUserById);

export default routerUser;
