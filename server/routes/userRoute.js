import express from 'express'
import {isAuth, login, logout, register} from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'

const userRouter=express.Router()

userRouter.post('/register',register)
userRouter.post('/login',login)
userRouter.get('/is-auth',authUser,isAuth)  //authUser act as middleware that will deocde cookie and attach id to req and then isAuth will take that id and find in db then give user data
userRouter.get('/logout',authUser,logout)

export default userRouter;