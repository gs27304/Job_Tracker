import { validationResult, body } from 'express-validator';

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array()[0].msg });
  }
  next();
};

const runValidation = async (req, validations) => {
  await Promise.all(validations.map((validation) => validation.run(req)));
};

export const validateAuthInput = async (req, res, next) => {
  await runValidation(req, [
    body('name').optional().isString().trim().isLength({ min: 2, max: 80 }),
    body('email').isEmail().normalizeEmail(),
    body('password').isString().isLength({ min: 6, max: 128 }),
  ]);

  return handleValidation(req, res, next);
};

export const validateJobInput = async (req, res, next) => {
  await runValidation(req, [
    body('company').optional().isString().trim().isLength({ min: 2, max: 150 }),
    body('role').optional().isString().trim().isLength({ min: 2, max: 150 }),
    body('notes').optional().isString().trim().isLength({ max: 2000 }),
    body('status').optional().isIn(['Applied', 'OA', 'Interview', 'Offer', 'Rejected', 'Wishlist']),
  ]);

  return handleValidation(req, res, next);
};

export const validateResumeUpload = (req, res, next) => {
  if (!req.file) return res.status(400).json({ success: false, message: 'No resume file provided' });
  next();
};
