
import React, { useState } from 'react';
import { JobCard } from '@/components/JobCard';
import { ApplyModal } from '@/components/ApplyModal';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  posted: string;
  description: string;
  skills: string[];
  logo: string;
  isRemote: boolean;
  isUrgent: boolean;
  experienceLevel: string;
}

const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Frontend Developer',
    company: 'TechStart Solutions',
    location: 'Bangalore',
    salary: '₹3-5 LPA',
    type: 'Full-time',
    posted: '2 hours ago',
    description: 'Join our dynamic team as a Frontend Developer. Perfect for fresh graduates with knowledge of React and modern web technologies.',
    skills: ['React', 'JavaScript', 'CSS', 'HTML'],
    logo: 'TS',
    isRemote: false,
    isUrgent: true,
    experienceLevel: 'Fresher'
  },
  {
    id: '2',
    title: 'Digital Marketing Intern',
    company: 'GrowthHack Digital',
    location: 'Remote',
    salary: '₹15-25k/month',
    type: 'Internship',
    posted: '4 hours ago',
    description: 'Learn digital marketing from industry experts. Great opportunity for marketing graduates to kickstart their career.',
    skills: ['Social Media', 'SEO', 'Content Writing', 'Analytics'],
    logo: 'GH',
    isRemote: true,
    isUrgent: false,
    experienceLevel: 'Fresher'
  },
  {
    id: '3',
    title: 'Python Developer',
    company: 'DataFlow Systems',
    location: 'Hyderabad',
    salary: '₹4-6 LPA',
    type: 'Full-time',
    posted: '6 hours ago',
    description: 'Build scalable applications using Python. Training will be provided for the right candidate.',
    skills: ['Python', 'Django', 'SQL', 'REST APIs'],
    logo: 'DF',
    isRemote: false,
    isUrgent: true,
    experienceLevel: 'Fresher'
  },
  {
    id: '4',
    title: 'UI/UX Designer',
    company: 'Creative Labs',
    location: 'Mumbai',
    salary: '₹3-4 LPA',
    type: 'Full-time',
    posted: '1 day ago',
    description: 'Design beautiful and intuitive user interfaces. Portfolio required. Fresh graduates welcome.',
    skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
    logo: 'CL',
    isRemote: false,
    isUrgent: false,
    experienceLevel: 'Fresher'
  },
  {
    id: '5',
    title: 'Sales Executive',
    company: 'SalesForce India',
    location: 'Delhi',
    salary: '₹2.5-4 LPA',
    type: 'Full-time',
    posted: '1 day ago',
    description: 'Join our sales team and help grow our business. Excellent communication skills required.',
    skills: ['Communication', 'Negotiation', 'CRM', 'Lead Generation'],
    logo: 'SF',
    isRemote: false,
    isUrgent: false,
    experienceLevel: 'Fresher'
  },
  {
    id: '6',
    title: 'Content Writer',
    company: 'WordCraft Media',
    location: 'Remote',
    salary: '₹20-30k/month',
    type: 'Part-time',
    posted: '2 days ago',
    description: 'Create engaging content for various platforms. Perfect for English graduates with writing passion.',
    skills: ['Writing', 'SEO', 'Research', 'Editing'],
    logo: 'WC',
    isRemote: true,
    isUrgent: false,
    experienceLevel: 'Fresher'
  }
];

export const JobGrid = () => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);

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

  return (
    <>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">
            {mockJobs.length} Jobs Found
          </h2>
          <div className="text-sm text-slate-600">
            Sorted by: Most Relevant
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onApply={handleApply}
            onSave={handleSave}
            isSaved={savedJobs.includes(job.id)}
          />
        ))}
      </div>
      
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
