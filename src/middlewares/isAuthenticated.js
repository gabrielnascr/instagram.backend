/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import ApiError from '../errors/ApiError';

import { JWT_SECRET } from '../environment';

export default (req, res, next) => {
  const authorizationToken = req.headers.authorization;

  if (!authorizationToken) {
    throw new ApiError(401, 'Authorization token not provided.');
  }

  const bearerToken = authorizationToken.split(' ')[1];

  if (!bearerToken) {
    throw new ApiError(401, 'Authorization token malformed.');
  }

  try {
    const userDecoded = jwt.verify(bearerToken, JWT_SECRET);

    req.user = userDecoded;

    return next();
  } catch (error) {
    throw new Error(error);
  }
};
