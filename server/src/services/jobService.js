import mongoose from 'mongoose';
import Job from '../models/Job.js';
import AppError from '../utils/AppError.js';

const buildJobQuery = ({ userId, search, status, sort, page, limit }) => {
  const query = { createdBy: userId };

  if (search) {
    query.$or = [
      { company: { $regex: search, $options: 'i' } },
      { role: { $regex: search, $options: 'i' } },
    ];
  }

  if (status) {
    query.status = status;
  }

  const sortOption = sort === 'oldest'
    ? { appliedDate: 1 }
    : { appliedDate: -1 };

  const pageNumber = Math.max(1, Number(page) || 1);
  const pageSize = Math.min(100, Math.max(1, Number(limit) || 10));
  const skip = (pageNumber - 1) * pageSize;

  return { query, sortOption, pageNumber, pageSize, skip };
};

export const createJobService = async (payload, userId) => {
  const job = await Job.create({ ...payload, createdBy: userId });
  return job;
};

export const getJobsService = async ({ userId, search, status, sort, page, limit }) => {
  const { query, sortOption, pageNumber, pageSize, skip } = buildJobQuery({ userId, search, status, sort, page, limit });

  const [jobs, total] = await Promise.all([
    Job.find(query).sort(sortOption).skip(skip).limit(pageSize),
    Job.countDocuments(query),
  ]);

  return {
    jobs,
    pagination: {
      page: pageNumber,
      limit: pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
    },
  };
};

export const getJobByIdService = async (jobId, userId) => {
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    throw new AppError('Invalid job id', 400);
  }

  const job = await Job.findOne({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new AppError('Job not found', 404);
  }

  return job;
};

export const updateJobService = async (jobId, payload, userId) => {
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    throw new AppError('Invalid job id', 400);
  }

  const job = await Job.findOneAndUpdate({ _id: jobId, createdBy: userId }, payload, {
    new: true,
    runValidators: true,
  });

  if (!job) {
    throw new AppError('Job not found', 404);
  }

  return job;
};

export const deleteJobService = async (jobId, userId) => {
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    throw new AppError('Invalid job id', 400);
  }

  const job = await Job.findOneAndDelete({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new AppError('Job not found', 404);
  }

  return job;
};
