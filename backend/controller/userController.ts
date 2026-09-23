import {  Request, Response } from "express";
import  userService from "../services/UserServices";

class UserController {
    async createUser(req: Request, res: Response): Promise<void> {
        try{
            const userDTO= req.body;
            const users= await userService.createUser(userDTO);
            return res.status(201).json(users);

        }catch(error){
            return res.status(500).json({ message: `Error creating user: ${error.message}` });
        }
    }

    async searchUser(req: Request, res: Response): Promise<any>{
        try{
            const user= await userService.searchUser(res);
            return res.status(200).json(user);

        }catch(error){
            return res.status(500).json({ message: `Error searching user: ${error.message}`})
        }

    }

    async searchUserById(req: Request, res: Response): Promise<void> {
        try{
            const user= await userService.searchUserById(req.params.id);
            return res.status(200).json(user);

        }catch(error){
            return res.status(500).json({ message: `Error searching user by ID: ${error.message}` });
        }
    }

    async searchUserByEmail(req: Request, res: Response): Promise<void> {
        try{
            const user= await userService.searchUserByEmail(req.params.email);
            return res.status(200).json(user);

        }catch(error){
            return res.status(500).json({ message: `Error searching user by email: ${error.message}` });
        }
    }

    async searchUserByName(req: Request, res: Response): Promise<void> {
        try{
            const user= await userService.searchUserByName(req.params.name);
            return res.status(200).json(user);

        }catch(error){
            return res.status(500).json({ message: `Error searching user by name: ${error.message}` });
        }

    
    }

    async deleteUserById(req: Request, res: Response): Promise<void> {
        try{
            await userService.deleteUserById(req.params.id);
            return res.status(200).json({ message: "User deleted successfully" });

        }catch(error){
            return res.status(500).json({ message: `Error deleting user by ID: ${error.message}` });
        }

    }

    async updateUserById(req: Request, res: Response): Promise<void> {
        try{
            const userUpdated= await userService.updateUserById(req.params.id, req.body);
            return res.status(200).json(userUpdated);

        }catch(error){
            return res.status(500).json({ message: `Error updating user by ID: ${error.message}` });
        }
    }
}
const userController= new UserController();
export default userController;