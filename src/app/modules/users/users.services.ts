import { TUser } from './users.interface';
import { User } from './users.model';

const getAllUser = async () => {
  const result = await User.find();
  return result;
};

const getMe = async (userId: string) => {
  console.log(userId);
  const result = await User.findById(userId);
  console.log(result);
  return result;
};

const updateProfile = async (id: string, payload: Partial<TUser>) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const UserServices = {
  getAllUser,
  getMe,
  updateProfile
};
