import database from '../database/postgres';

const FollowersRepository = {
  find: async ({ userId }) => {
    const followersQuery = `
        SELECT * FROM user_followers users WHERE user_id = $1
    `;

    try {
      const { rows: followers } = await database.query(followersQuery, [
        userId,
      ]);

      const { rows: profiles } = await database.query(
        'SELECT * FROM public.user',
      );

      const returnedData = followers.map(
        (follower) => profiles.filter((user) => user.id === follower.follower_id)[0],
      );

      return returnedData;
    } catch (error) {
      throw new Error(error);
    }
  },
  followedUsers: async ({ userId }) => {
    const query = `
        SELECT * from user_followers WHERE follower_id = $1
    `;

    try {
      const { rows } = await database.query(query, [userId]);

      return rows;
    } catch (error) {
      throw new Error(error);
    }
  },
  store: async ({ userId, followerId }) => {
    const query = `
        INSERT INTO user_followers (
            user_id,
            follower_id
        )
        VALUES ($1, $2)
        RETURNING *
    `;

    try {
      await database.query(query, [userId, followerId]);

      const { rows: userRows } = await database.query(
        'SELECT * FROM public.user WHERE id = $1',
        [userId],
      );
      const { rows: followerRows } = await database.query(
        'SELECT * FROM public.user WHERE id = $1',
        [followerId],
      );

      return {
        target_profile: userRows[0],
        new_follower: followerRows[0],
      };
    } catch (error) {
      throw new Error(error);
    }
  },
  delete: async ({ userId, followerId }) => {
    const query = `
        DELETE FROM user_followers WHERE user_id = $1 AND follower_id = $2
    `;

    try {
      await database.query(query, [userId, followerId]);
    } catch (error) {
      throw new Error(error);
    }
  },
};

export default FollowersRepository;
