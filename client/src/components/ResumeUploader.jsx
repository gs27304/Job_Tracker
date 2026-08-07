import { useState } from 'react';
import { useAppToast } from '../hooks/useAppToast';
import api from '../services/api';
import { getErrorMessage } from '../utils/helpers';

function ResumeUploader({ jobId, currentUrl, onUploaded }) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const toast = useAppToast();

  const handleUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file || !jobId) return;

    const formData = new FormData();
    formData.append('resume', file);

    setUploading(true);
    setProgress(10);

    try {
      const { data } = await api.post(`/jobs/${jobId}/resume`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percent);
        },
      });

      setProgress(100);
      onUploaded?.(data.data.resumeUrl);
      toast.success('Resume uploaded successfully');
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setUploading(false);
      setTimeout(() => setProgress(0), 1200);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/jobs/${jobId}/resume`);
      onUploaded?.('');
      toast.info('Resume removed');
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
      <label className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-dashed border-slate-300 px-4 py-3 text-sm text-slate-600 dark:border-slate-600 dark:text-slate-300">
        <span>{currentUrl ? 'Replace resume' : 'Upload resume'}</span>
        <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleUpload} />
      </label>

      {uploading && (
        <div className="mt-3">
          <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700">
            <div className="h-2 rounded-full bg-slate-900 transition-all dark:bg-sky-500" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-2 text-xs text-slate-500">Uploading {progress}%</p>
        </div>
      )}

      {currentUrl && (
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <a href={currentUrl} target="_blank" rel="noreferrer" className="text-sm text-blue-600">Preview resume</a>
          <button type="button" onClick={handleDelete} className="text-sm text-red-600">Delete</button>
        </div>
      )}
    </div>
  );
}

export default ResumeUploader;
