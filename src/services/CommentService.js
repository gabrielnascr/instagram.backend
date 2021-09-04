import CommentRepository from '../repositories/CommentRepository';
import UserRepository from '../repositories/UserRepository';
import PhotoRepository from '../repositories/PhotoRepository';

import ApiError from '../errors/ApiError';

const CommentService = {
  findByPhoto: async ({ photoId }) => {
    const comments = await CommentRepository.findByPhoto({ photoId });

    return comments;
  },
  store: async ({ photoId, authorId, text }) => {
    const userExists = await UserRepository.findById(authorId);
    const photoExists = await PhotoRepository.findById(photoId);

    if (!userExists) {
      throw new ApiError(404, 'This user doesn\'t exists.');
    }
    if (!photoExists) {
      throw new ApiError(404, 'This photo doesn\'t exists.');
    }

    const commentAdded = await CommentRepository.store({ photoId, authorId, text });
    return commentAdded;
  },
};

export default CommentService;
