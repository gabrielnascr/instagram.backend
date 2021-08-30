import UserRepository from "../repositories/UserRepository";
import StatusCode from "../constants/statusCode";
import ApiError from "../errors/ApiError";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateJwt = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET);
};

const SessionService = {
  login: async ({ email, password }) => {
    const user = await UserRepository.findByEmail(email);

    if (!user) {
      throw new ApiError(StatusCode.NOT_FOUND, "User not found.");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new ApiError(StatusCode.UNAUTHORIZED, "Invalid credentials.");
    }

    const token = generateJwt({
      id: user.id,
      email: user.email,
    });

    const responseData = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      access_token: token,
    };

    return responseData;
  },
  signUp: async (user) => {
    const userExists = await UserRepository.findByEmail(user.email);

    if (userExists) {
      throw new ApiError(StatusCode.UNAUTHORIZED, "User already exists.");
    }

    const encryptedPassword = await bcrypt.hash(user.password, 8);

    const registeredUser = await UserRepository.store({
      ...user,
      password: encryptedPassword,
    });

    return registeredUser;
  },
};

export default SessionService;
