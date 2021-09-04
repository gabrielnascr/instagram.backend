import LikeRepository from '../repositories/LikeRepository';

const LikeService = {
  likePhoto: async (photoId, userId) => await LikeRepository.store(userId, photoId),
  unLikePhoto: async (photoId) => await LikeRepository.delete(photoId),
};

export default LikeService;
