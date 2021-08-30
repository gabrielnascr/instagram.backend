import ApiError from "../errors/ApiError";

export default function ErrorHandler(error, req, res, next) {
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
