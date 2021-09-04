import database from '../database/postgres';

const LikeRepository = {
  store: async (userId, photoId) => {
    const query = `
        INSERT INTO likes (
            user_id,
            photo_id
        )
        VALUES ($1, $2)
    `;

    try {
      const { rows } = await database.query(query, [userId, photoId]);

      return rows[0];
    } catch (error) {
      throw new Error(error);
    }
  },
  delete: async (photoId) => {
    const query = 'DELETE FROM likes WHERE photo_id = $1';

    try {
      const { rows } = await database.query(query, [photoId]);

      return rows[0];
    } catch (error) {
      throw new Error(error);
    }
  },
};

export default LikeRepository;
