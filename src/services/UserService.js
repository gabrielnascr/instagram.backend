import UserRepository from '../repositories/UserRepository';
import FriendshipsService from './FriendshipsService';

const UserService = {
  getProfile: async (loggedUserID) => {
    const user = await UserRepository.findById(loggedUserID);
    const userFollowers = await FriendshipsService.followers({ userId: user.id });

    delete user.password;

    const response = {
      user,
      followers: userFollowers,
    };

    return response;
  },
  updateProfile: async () => {

  },
};

export default UserService;
