import LikeRepository from '../repositories/LikeRepository';

const LikeService = {
  likePhoto: async (photo_id, user_id) => {
    return await LikeRepository.store(user_id, photo_id)
  },
  unLikePhoto: async (photo_id) => {
    return await LikeRepository.delete(photo_id);
  }
}

export default LikeService