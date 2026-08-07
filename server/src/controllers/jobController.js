import {
  createJobService,
  deleteJobService,
  getJobByIdService,
  getJobsService,
  updateJobService,
} from '../services/jobService.js';

export const getJobs = async (req, res, next) => {
  try {
    const result = await getJobsService({
      userId: req.user._id,
      search: req.query.search,
      status: req.query.status,
      sort: req.query.sort,
      page: req.query.page,
      limit: req.query.limit,
    });

    res.status(200).json({ success: true, data: result.jobs, pagination: result.pagination });
  } catch (error) {
    next(error);
  }
};

export const getJobById = async (req, res, next) => {
  try {
    const job = await getJobByIdService(req.params.id, req.user._id);
    res.status(200).json({ success: true, data: job });
  } catch (error) {
    next(error);
  }
};

export const createJob = async (req, res, next) => {
  try {
    const job = await createJobService(req.body, req.user._id);
    res.status(201).json({ success: true, message: 'Job created successfully', data: job });
  } catch (error) {
    next(error);
  }
};

export const updateJob = async (req, res, next) => {
  try {
    const job = await updateJobService(req.params.id, req.body, req.user._id);
    res.status(200).json({ success: true, message: 'Job updated successfully', data: job });
  } catch (error) {
    next(error);
  }
};

export const deleteJob = async (req, res, next) => {
  try {
    const job = await deleteJobService(req.params.id, req.user._id);
    res.status(200).json({ success: true, message: 'Job deleted successfully', data: job });
  } catch (error) {
    next(error);
  }
};
