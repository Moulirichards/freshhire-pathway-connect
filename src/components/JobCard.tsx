
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { MapPin, Clock, Building, Bookmark, BookmarkCheck, Zap } from 'lucide-react';

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

interface JobCardProps {
  job: Job;
  onApply: (job: Job) => void;
  onSave: (jobId: string) => void;
  isSaved: boolean;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onApply, onSave, isSaved }) => {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-slate-200 bg-white/80 backdrop-blur-sm">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
              {job.logo}
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                {job.title}
              </h3>
              <p className="text-sm text-slate-600 flex items-center gap-1">
                <Building className="h-3 w-3" />
                {job.company}
              </p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSave(job.id)}
            className="p-2 hover:bg-slate-100"
          >
            {isSaved ? (
              <BookmarkCheck className="h-4 w-4 text-blue-600" />
            ) : (
              <Bookmark className="h-4 w-4 text-slate-400" />
            )}
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {job.isUrgent && (
            <Badge variant="destructive" className="text-xs flex items-center gap-1">
              <Zap className="h-3 w-3" />
              Urgent Hiring
            </Badge>
          )}
          {job.isRemote && (
            <Badge variant="secondary" className="text-xs">
              Remote
            </Badge>
          )}
          <Badge variant="outline" className="text-xs">
            {job.experienceLevel}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <MapPin className="h-4 w-4" />
            {job.location}
          </div>
          
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Clock className="h-4 w-4" />
            Posted {job.posted}
          </div>
        </div>
        
        <p className="text-sm text-slate-700 line-clamp-2">
          {job.description}
        </p>
        
        <div className="space-y-2">
          <div className="text-lg font-semibold text-green-600">
            {job.salary}
          </div>
          <div className="text-sm text-slate-600">
            {job.type}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1">
          {job.skills.slice(0, 3).map((skill) => (
            <Badge key={skill} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
          {job.skills.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{job.skills.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>
      
      <CardFooter>
        <Button
          onClick={() => onApply(job)}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 group-hover:scale-105"
        >
          Apply Now
        </Button>
      </CardFooter>
    </Card>
  );
};
