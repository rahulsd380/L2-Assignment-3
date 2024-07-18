import { TUser } from './users.interface';
import { User } from './users.model';

const getAllUser = async () => {
  const result = await User.find();
  return result;
};

const getUserById = async (userId: string) => {
  const result = await User.findById(userId);
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
  getUserById,
  updateProfile
};
