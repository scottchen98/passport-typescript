import { userModel } from "../models/userModel";

const getUserByEmailIdAndPassword = (email: string, password: string) => {
  let user = userModel.findOne(email);

  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
};
const getUserById = (id: any) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

function isUserValid(user: any, password: string) {
  if (user.password === password) {
    return true;
  }
  throw new Error("Password is incorrect");
}

const findOrCreateUser = (id: number, name: string) => {
  return userModel.findOrCreate(id, name);
};

export { getUserByEmailIdAndPassword, getUserById, findOrCreateUser };
