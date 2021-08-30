import database from "../database/postgres";

const LikeRepository = {
  store: async (user_id, photo_id) => {
    const query = `
        INSERT INTO likes (
            user_id,
            photo_id
        )
        VALUES ($1, $2)
    `;

    try {
      const { rows } = await database.query(query, [user_id, photo_id]);

      return rows[0];
    } catch (error) {}
  },
  delete: async (photo_id) => {
    const query = "DELETE FROM likes WHERE photo_id = $1";

    try {
      const { rows } = await database.query(query, [photo_id]);

      return rows[0];
    } catch (error) {}
  },
};

export default LikeRepository;
