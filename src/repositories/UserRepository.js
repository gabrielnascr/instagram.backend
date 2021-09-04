import database from '../database/postgres';

const UserRepository = {
  findById: async (id) => {
    try {
      const { rows } = await database.query(
        'SELECT * FROM public.user WHERE id = $1',
        [id],
      );

      return rows[0];
    } catch (error) {
      throw new Error(error);
    }
  },
  findByEmail: async (email) => {
    try {
      const { rows } = await database.query(
        'SELECT * FROM public.user WHERE email = $1',
        [email],
      );

      return rows[0];
    } catch (error) {
      throw new Error(error);
    }
  },
  store: async (user) => {
    const query = `
        INSERT INTO public.user (
            username,
            name,
            email,
            password,
            profile_picture,
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
        user.profile_picture,
        user.website,
        user.biography,
        user.phone_number,
      ]);

      return rows[0];
    } catch (error) {
      throw new Error(error);
    }
  },
};

export default UserRepository;
