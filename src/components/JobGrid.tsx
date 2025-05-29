
import React, { useState, useEffect } from 'react';
import { JobCard } from '@/components/JobCard';
import { ApplyModal } from '@/components/ApplyModal';
import { jobService } from '@/services/jobService';
import { Job } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';

export const JobGrid = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const jobsData = await jobService.getJobs();
      setJobs(jobsData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch jobs",
        variant: "destructive",
      });
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = (job: Job) => {
    setSelectedJob(job);
  };

  const handleSave = (jobId: string) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">
            {jobs.length} Jobs Found
          </h2>
          <div className="text-sm text-slate-600">
            Sorted by: Most Recent
          </div>
        </div>
      </div>
      
      {jobs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No jobs found. Try adjusting your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onApply={handleApply}
              onSave={handleSave}
              isSaved={savedJobs.includes(job.id)}
            />
          ))}
        </div>
      )}
      
      {selectedJob && (
        <ApplyModal
          job={selectedJob}
          isOpen={!!selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </>
  );
};
