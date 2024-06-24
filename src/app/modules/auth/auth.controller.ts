import httpStatus from "http-status";
import { AuthServices } from "./auth.service";
import sendResponse from "../../utils/sendResponse";

const loginUser = async (req, res) => {
    const result = await AuthServices.loginUser(
        req.body
      );
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Logged in successfully.",
        data: result,
      });
};


export const AuthControllers = {
    loginUser,
}