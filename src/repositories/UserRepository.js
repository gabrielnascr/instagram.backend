import database from "../database/postgres";

const UserRepository = {
  findById: async (id) => {
    try {
      const { rows } = await database.query(
        "SELECT * FROM users WHERE id = $1",
        [id]
      );

      return rows[0];
    } catch (error) {
      console.log(error);
    }
  },
  findByEmail: async (email) => {
    try {
      const { rows } = await database.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );

      return rows[0];
    } catch (error) {}
  },
  store: async (user) => {
    const query = `
        INSERT INTO users (
            username,
            name,
            email,
            password,
            avatar,
            website,
            biography,
            phone_number
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *
    `;

    try {
      const { rows } = await database.query(query, [
        user.username,
        user.name,
        user.email,
        user.password,
        user.avatar,
        user.website,
        user.biography,
        user.phone_number,
      ]);

      return rows[0];
    } catch (error) {}
  },
};

export default UserRepository;
