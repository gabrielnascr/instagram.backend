import PhotoRepository from '../repositories/PhotoRepository';
// import FollowersRepository from '../repositories/FollowersRepository';

import { uploadFile } from './S3Service';

const PhotoService = {
  store: async ({ userId, caption, file }) => {
    const { Location } = await uploadFile(file);

    const storedPhoto = await PhotoRepository.store({
      user_id: userId,
      caption,
      image_path: Location,
      image_size: file.size,
    });

    return storedPhoto;
  },
  findRelevantPhotos: async ({ userId }) => {
    const photos = await PhotoRepository.findByFollower({ followerId: userId });

    return photos;
  },
};

export default PhotoService;
