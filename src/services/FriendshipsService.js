/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
import UserRepository from '../repositories/UserRepository';
import FollowersRepository from '../repositories/FollowersRepository';
import ApiError from '../errors/ApiError';

const FriendshipsService = {
  followers: async ({ userId }) => {
    const followers = await FollowersRepository.find({ userId });
    return followers;
  },
  follow: async ({ userId, followerId }) => {
    const targetUserExists = await UserRepository.findById(userId);
    const newFollowerExists = await UserRepository.findById(followerId);
    const targetUserFollowers = await FollowersRepository.find({ userId });

    if (!targetUserExists) {
      throw new ApiError(404, 'This user id is invalid.');
    }

    if (!newFollowerExists) {
      throw new ApiError(404, 'This follower id is invalid.');
    }

    const alreadyFollow = targetUserFollowers.filter(
      (user) =>
        user.id === Number(followerId),
    );

    if (alreadyFollow.length === 1) {
      throw new ApiError(400, 'You already follow this user');
    }

    const followData = await FollowersRepository.store({ userId, followerId });
    return followData;
  },
  unFollow: async ({ userId, followerId }) => {
    const targetUserExists = await UserRepository.findById(userId);
    const newFollowerExists = await UserRepository.findById(followerId);
    const targetUserFollowers = await FollowersRepository.find({ userId });

    if (!targetUserExists) {
      throw new ApiError(404, 'This user id is invalid.');
    }

    if (!newFollowerExists) {
      throw new ApiError(404, 'This follower id is invalid.');
    }

    const alreadyFollow = targetUserFollowers.filter(
      (user) =>
        user.id === Number(followerId),
    );

    if (alreadyFollow.length === 0) {
      throw new ApiError(400, 'You don\'t follow this user ');
    }

    const unFollowData = await FollowersRepository.delete({ userId, followerId });
    return unFollowData;
  },
};

export default FriendshipsService;
