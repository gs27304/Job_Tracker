export const successResponse = (res, statusCode, data, message = 'Success') => {
  return res.status(statusCode).json({ success: true, message, data });
};

export const errorResponse = (res, statusCode, message = 'Something went wrong') => {
  return res.status(statusCode).json({ success: false, message });
};
