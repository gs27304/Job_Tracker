import { deleteFromCloudinary, uploadToCloudinary } from '../config/cloudinary.js';
import Job from '../models/Job.js';
import AppError from '../utils/AppError.js';

export const uploadResumeController = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new AppError('No resume file provided', 400);
    }

    const uploadResult = await uploadToCloudinary(req.file.buffer);
    const job = await Job.findByIdAndUpdate(
      req.params.jobId,
      { resumeUrl: uploadResult.secure_url, resumePublicId: uploadResult.public_id },
      { new: true }
    );

    if (!job) {
      throw new AppError('Job not found', 404);
    }

    res.status(200).json({ success: true, message: 'Resume uploaded successfully', data: { resumeUrl: uploadResult.secure_url } });
  } catch (error) {
    next(error);
  }
};

export const deleteResumeController = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) throw new AppError('Job not found', 404);

    if (job.resumePublicId) {
      await deleteFromCloudinary(job.resumePublicId);
    }

    job.resumeUrl = '';
    job.resumePublicId = '';
    await job.save();

    res.status(200).json({ success: true, message: 'Resume removed successfully' });
  } catch (error) {
    next(error);
  }
};
