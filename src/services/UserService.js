import FollowersRepository from '../repositories/FollowersRepository';
import UserRepository from '../repositories/UserRepository';

const UserService = {
  getProfile: async (loggedUserID) => {
    const user = await UserRepository.findById(loggedUserID);

    delete user.password;
    return user;
  },
  updateProfile: async () => {

  },
};

export default UserService;
