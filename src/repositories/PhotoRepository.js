import database from "../database/postgres";

const PhotoRepository = {
  findById: async (id) => {
    const { rows } = await database.query(
      "SELECT * FROM photos WHERE id = $1",
      [id]
    );
    return rows[0];
  },
  findByUser: async (userId) => {
    const { rows: photosRows } = await database.query(
      "SELECT * FROM photos WHERE user_id = $1",
      [userId]
    );

    const { rows: usersRows } = await database.query(
      "SELECT * FROM users WHERE id = $1", [userId]
    )

    const returnedData = photosRows.map((photo) => {
      return {
        id: photo.id,
        user: {
          id: usersRows[0].id,
          username: usersRows[0].username,
          profile_picture: usersRows[0].avatar,
        },
        caption: photo.caption,
        image_path: photo.image_path,
        image_size: photo.image_size,
        created_at: photo.created_at,
        updated_at: photo.updated_at
      };
    });

    return returnedData;
  },
  store: async (photo) => {
    const query = `
        INSERT INTO photos (
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
