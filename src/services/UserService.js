import UserRepository from '../repositories/UserRepository';
import FriendshipsService from './FriendshipsService';

const UserService = {
  getProfile: async (loggedUserID) => {
    const user = await UserRepository.findById(loggedUserID);
    const userFollowers = await FriendshipsService.followers({ userId: user.id });

    delete user.password;
    return {
      user,
      followers: userFollowers,
    };
  },
  updateProfile: async () => {

  },
};

export default UserService;
