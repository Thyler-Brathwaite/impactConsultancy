import express from 'express'
import {getUser, getUsers,makeUser, updateUser,deleteUser} from '../controllers/userController.js'

const UserRouter = express();


UserRouter.get("/:id", getUser);

UserRouter.get("/", getUsers);

UserRouter.post("/", makeUser);

UserRouter.put("/:id", updateUser);

UserRouter.delete("/:id", deleteUser);

export default UserRouter;