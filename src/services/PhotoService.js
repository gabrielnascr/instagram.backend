import PhotoRepository from "../repositories/PhotoRepository";
import { uploadFile } from "./S3Service";

const PhotoService = {
  store: async ({ user_id, caption, file }) => {
    const { Location } = await uploadFile(file);

    const storedPhoto = await PhotoRepository.store({
      user_id,
      caption,
      image_path: Location,
      image_size: file.size,
    });

    return storedPhoto;
  },
};

export default PhotoService;
