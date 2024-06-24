import { Model } from "mongoose";

export interface TUser {
    name: string;
    email: string;
    password: string;
    phone: number;
    address: string;
    role: 'admin' | 'user';
    isDeleted: boolean;
  };

  export interface UserModel extends Model<TUser>{
    isUserExists(email:string): Promise<TUser>
    isPasswordMatched(plainTextPassword: string, hashedPassword: string) : Promise<boolean>
  }