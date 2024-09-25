import { User } from "../schemas/signupSchema.js";
import e from "cors";

const loginUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const existUser = await User.findOne({
        $or: [
          { username: data.username_email },
          { email: data.username_email },
        ],
      });
      if (existUser) {
        resolve(existUser);
      } else {
        throw new Error("User doesn't exist");
      }
    } catch (error) {
      reject(error);
    }
  });
};

const signUpUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const existedUser = await User.findOne({
        $or: [{ username: data.username }, { email: data.email }],
      });

      if (
        existedUser &&
        existedUser.username === data.username &&
        existedUser.email === data.email
      ) {
        throw new Error("Username and Email Already Exists");
      } else if (existedUser && existedUser.username === data.username) {
        throw new Error("Username Already Exists");
      } else if (existedUser && existedUser.email === data.email) {
        throw new Error("Email Already Exists");
      } else {
        const user = new User(data);
        const newUser = await user.save();
        resolve(newUser);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getUserByEmail = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const existedUser = await User.findOne({ email: data.email });
      if (existedUser) {
        resolve(existedUser);
      } else {
        throw new Error("User doesn't exist");
      }
    } catch (error) {
      reject(error);
    }
  });
};

const forgotUserPassword = (email, token) => {
  return new Promise(async (resolve, reject) => {
    try {
      const existedUser = await User.findOne({ email: email });
      if (existedUser && existedUser.email != email) {
        throw new Error("User doesn't exist");
      } else {
        existedUser.resetPasswordToken = token;
        existedUser.resetPasswordExpires = Date.now() + 3600000;
        const updatedUser = await existedUser.save();
        resolve(updatedUser);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getUserById = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const existedUser = await User.findById(data.id);
      if (existedUser) {
        resolve(existedUser);
      } else {
        throw new Error("User doesn't exist");
      }
    } catch (error) {
      reject(error);
    }
  });
};

const resetUserPassword = (data, accessToken, newPassword) => {
  return new Promise(async (resolve, reject) => {
    try {
      const existedUser = await User.findById(data._id);

      // if (existedUser) {
      // resolve(existedUser);
      if (!existedUser) {
        throw new Error("User doesn't exist");
      } else if (existedUser.resetPasswordToken !=accessToken) {
        throw new Error("Token is invalid");
      } else if (existedUser.resetPasswordExpires < Date.now()) {
        throw new Error("Token is expired");
      } else {
        // Reset password
        existedUser.password = newPassword;
        existedUser.resetPasswordToken = undefined;
        existedUser.resetPasswordExpires = undefined;
        const updatedUser = await existedUser.save();
        resolve(updatedUser);
      }
      //}
    } catch (error) {
      reject(error);
    }
  });
};

export {
  loginUser,
  signUpUser,
  getUserByEmail,
  forgotUserPassword,
  getUserById,
  resetUserPassword,
};
