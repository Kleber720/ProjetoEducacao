import { Router } from "express";
import userController from "../controller/userController";

const routerUser= Router();

routerUser.post("/users", userController.createUser);
routerUser.get("/users/:id", userController.searchUserById);
routerUser.get("/users/email/:email", userController.searchUserByEmail);
routerUser.get("/users/name/:name", userController.searchUserByName);
routerUser.delete("/users/:id", userController.deleteUserById);
routerUser.put("/users/:id", userController.updateUserById);

export default routerUser;
