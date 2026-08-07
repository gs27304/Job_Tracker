import express from 'express';
import { createJob, deleteJob, getJobById, getJobs, updateJob } from '../controllers/jobController.js';
import { deleteResumeController, uploadResumeController } from '../controllers/uploadController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { uploadResume } from '../middlewares/uploadMiddleware.js';
import { validateJobInput, validateResumeUpload } from '../utils/validators.js';

const router = express.Router();

router.use(authMiddleware);
router.get('/', getJobs);
router.get('/:id', getJobById);
router.post('/', validateJobInput, createJob);
router.put('/:id', validateJobInput, updateJob);
router.delete('/:id', deleteJob);
router.post('/:jobId/resume', uploadResume, validateResumeUpload, uploadResumeController);
router.delete('/:jobId/resume', deleteResumeController);

export default router;
