import httpStatus from "http-status";
import { TLoginAuth, TUser } from "./auth.interface";
import { User } from "../users/users.model";
import AppError from "../../errors/AppError";
import jwt from "jsonwebtoken";
import config from "../../config";

const createUser = async (payload: TUser) => {
    const result = await User.create(payload);
    return result;
  };


const loginUser = async (payload: TLoginAuth) => {

    // Check if the user exists or not

    const user = await User.isUserExists(payload.email)
    if(!await user){
        throw new AppError(httpStatus.NOT_FOUND, 'User does not exists.')
    }

    // Check if the user already deleted or not
    // const isUserDeleted = isUserexists?.isDeleted;
    // console.log(isUserDeleted);
    // if(isUserDeleted){
    //     throw new AppError(httpStatus.NOT_FOUND, 'This user is deleted form DB!')
    // }

    // Check if the password is correct or not
    if(!(await User.isPasswordMatched(payload?.password, user?.password))){
        throw new AppError(httpStatus.FORBIDDEN, 'Password is not correct.')
    }

    // Create token and send to client/user

    const jwtPayload = {
        userId : user._id.toString(),
        userEmail: user.email,
        role: user.role
    }
    console.log(jwtPayload);
    const accessToken = jwt.sign(
        jwtPayload, config.jwt_access_secret as string, { expiresIn: '20d' });


    // Access the user into his account.

    return {
        accessToken
    }
   

}

export const AuthServices = {
    createUser,
    loginUser,
}