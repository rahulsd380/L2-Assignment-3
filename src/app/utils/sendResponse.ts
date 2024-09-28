import { Response } from "express";

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  token? : string;
  data: T;
};
const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  console.log(data);
  res.status(data.statusCode?? 200).json({
    statusCode : data.statusCode,
    success: data.success,
    message: data.message,
    token : data.token,
    data: data.data,
  });
};

export default sendResponse;
