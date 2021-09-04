import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserRepository from '../repositories/UserRepository';
import ApiError from '../errors/ApiError';

const generateJwt = (payload) => jwt.sign(payload, process.env.JWT_SECRET);

const SessionService = {
  login: async ({ email, password }) => {
    const user = await UserRepository.findByEmail(email);

    if (!user) {
      throw new ApiError(404, 'User not found.');
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new ApiError(401, 'Invalid credentials.');
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
      throw new ApiError(401, 'User already exists.');
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
