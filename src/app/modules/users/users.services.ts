import { TUser } from "./users.interface";
import { User } from "./users.model";


const createUser = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};


const getAllUser = async () => {
  const result = await User.find();
  return result;
}

export const UserServices = {
  createUser,
  getAllUser
};