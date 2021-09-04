import database from '../database/postgres';

const PhotoRepository = {
  find: async () => {
    const { rows } = await database.query(
      'SELECT * from photo',
    );

    return rows;
  },
  findById: async (id) => {
    const { rows } = await database.query(
      'SELECT * FROM photo WHERE id = $1',
      [id],
    );

    return rows[0];
  },
  findByUser: async (userId) => {
    const { rows: photosRows } = await database.query(
      'SELECT * FROM photo WHERE user_id = $1',
      [userId],
    );

    const { rows: usersRows } = await database.query(
      'SELECT * FROM public.user WHERE id = $1', [userId],
    );

    const returnedData = photosRows.map((photo) => ({
      id: photo.id,
      user: {
        id: usersRows[0].id,
        username: usersRows[0].username,
        profile_picture: usersRows[0].profile_picture,
      },
      caption: photo.caption,
      image_path: photo.image_path,
      image_size: photo.image_size,
      created_at: photo.created_at,
      updated_at: photo.updated_at,
    }));

    return returnedData;
  },
  findByFollower: async ({ followerId }) => {
    const queryPhotos = `
      SELECT * from public.user, user_followers, photo
      WHERE photo.user_id = public.user.id AND public.user.id=user_followers.user_id
      AND  user_followers.follower_id = $1 ORDER BY RANDOM()
    `;

    const queryComments = `
      SELECT * from photo, photo_comments WHERE photo.id = photo_comments.photo_id AND photo_comments.photo_id = 52
    `;

    const { rows: photos } = await database.query(queryPhotos, [followerId]);
    const { rows: comments } = await database.query(queryComments);

    console.log(photos);

    const returnedData = photos.map((data) => ({
      id: data.id,
      user: {
        email: data.email,
        name: data.name,
        username: data.username,
        profile_picture: data.profile_picture,
      },
      caption: data.caption,
      image_path: data.image_path,
      image_size: data.image_size,
    }));

    return returnedData;
  },
  store: async (photo) => {
    const query = `
        INSERT INTO photo (
            user_id,
            caption,
            image_path,
            image_size
        )
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `;

    try {
      const { rows } = await database.query(query, [
        photo.user_id,
        photo.caption,
        photo.image_path,
        photo.image_size,
      ]);

      return rows[0];
    } catch (error) {
      throw new Error(error);
    }
  },
  update: async () => {},
  delete: async () => {},
};

export default PhotoRepository;
