
CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  profile_picture VARCHAR(255) NULL,
  website VARCHAR(255) NULL,
  biography VARCHAR(255) NULL,
  phone_number VARCHAR(266) NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE user_followers(
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  follower_id INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (follower_id) REFERENCES users(id)
)

CREATE TABLE photos(
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  caption VARCHAR (255) NULL,
  image_path VARCHAR (255) NOT NULL,
  image_size INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE comments(
  id SERIAL PRIMARY KEY,
  comment VARCHAR (255) NOT NULL
);

CREATE TABLE photos_comments(
  id SERIAL PRIMARY KEY,
  photo_id INTEGER,
  comment_id INTEGER,
  FOREIGN KEY (photo_id) REFERENCES photos(id),
  FOREIGN KEY (comment_id) REFERENCES comments(id)
);

CREATE TABLE likes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  photo_id INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(id)
);