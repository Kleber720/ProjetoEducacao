import { Router } from 'express';
import userController from '../controller/UserController';

const routerUser = Router();

routerUser.post('/login', userController.login);
routerUser.post('/users', userController.createUser);
routerUser.get('/users/list', userController.searchUser);
routerUser.get('/users/email/:email', userController.searchUserByEmail);
routerUser.get('/users/name/:name', userController.searchUserByName);
routerUser.get('/users/:id', userController.searchUserById);
routerUser.delete('/users/:id', userController.deleteUserById);
routerUser.put('/users/:id', userController.updateUserById);

export default routerUser;
