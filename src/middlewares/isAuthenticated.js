import ApiError from "../errors/ApiError";
import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const authorizationToken = req.headers.authorization;

  if (!authorizationToken) {
    throw new ApiError(401, "Authorization token not provided.");
  }

  const bearerToken = authorizationToken.split(" ")[1];

  if (!bearerToken) {
    throw new ApiError(401, "Authorization token malformed.");
  }

  try {
    const userDecoded = jwt.verify(bearerToken, process.env.JWT_SECRET);

    req.user = userDecoded;
    console.log(req.user);

    return next();
  } catch (error) {
    console.log(error);
  }
};
