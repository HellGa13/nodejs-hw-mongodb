import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {// eslint-disable-line no-unused-vars
  res.setHeader('Content-Type', 'application/json');
  if (err instanceof HttpError) {
    res.status(err.status).json({
      status: err.status,
      message: err.name,
      data: err,
    });
    return;
  }
  
  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    data: err.message || "Unknown error",
  });
};