import database from '../database/postgres';

const CommentRepository = {
  findByPhoto: async ({ photoId }) => {
    const query = `
        SELECT * from photo, photo_comments, comment, public.user
        WHERE photo.id = photo_comments.photo_id 
        AND photo_comments.photo_id = $1 
        AND comment.id = photo_comments.comment_id 
        AND comment.author_id = public.user.id
    `;

    try {
      const { rows } = await database.query(query, [photoId]);

      const returnedData = rows.map((data) => ({
        id: data.comment_id,
        text: data.text,
        author: {
          id: data.author_id,
          email: data.email,
          username: data.username,
          profile_picture: data.profile_picture,
        },
      }));

      return returnedData;
    } catch (error) {
      throw new Error(error);
    }
  },
  store: async ({ photoId, authorId, text }) => {
    const insertCommentQuery = `
        INSERT INTO comment (
            author_id,
            text
        )
        VALUES ($1, $2)
        RETURNING *
    `;

    const insertPhotoCommentQuery = `
        INSERT INTO photo_comments (
            photo_id,
            comment_id
        ) 
        VALUES ($1, $2)
        RETURNING *
    `;

    try {
      const { rows: commentAdded } = await database.query(insertCommentQuery, [
        authorId,
        text,
      ]);

      await database.query(
        insertPhotoCommentQuery,
        [photoId, commentAdded[0].id],
      );

      return commentAdded;
    } catch (error) {
      throw new Error(error);
    }
  },
};

export default CommentRepository;
