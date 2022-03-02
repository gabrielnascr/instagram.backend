/* eslint-disable no-unused-vars */
import ApiError from '../errors/ApiError';

export default function ErrorHandler(error, req, res, next) {
  //Ok, now I got why you created the de ApiError class. I thought you were going to throw the stack traces. You may "ignore" what I commented, but don't forget to read about it.
  if (error instanceof ApiError) {
    return res.status(error.code).send({
      error: {
        status: error.code,
        message: error.message,
      },
    });
  }

  return res.status(500).json({
    error: {
      status: 500,
      message: error.message,
    },
  });
}
