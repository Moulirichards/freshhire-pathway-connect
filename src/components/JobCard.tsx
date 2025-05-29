
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { MapPin, Clock, Building, Bookmark, BookmarkCheck, Zap } from 'lucide-react';
import { Job } from '@/lib/supabase';

interface JobCardProps {
  job: Job;
  onApply: (job: Job) => void;
  onSave: (jobId: string) => void;
  isSaved: boolean;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onApply, onSave, isSaved }) => {
  // Format the date to show "X days ago"
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-orange-200 bg-white/80 backdrop-blur-sm">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-amber-600 rounded-lg flex items-center justify-center text-white font-bold">
              {job.logo}
            </div>
            <div>
              <h3 className="font-semibold text-amber-900 group-hover:text-orange-600 transition-colors">
                {job.title}
              </h3>
              <p className="text-sm text-amber-700 flex items-center gap-1">
                <Building className="h-3 w-3" />
                {job.company}
              </p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSave(job.id)}
            className="p-2 hover:bg-yellow-50"
          >
            {isSaved ? (
              <BookmarkCheck className="h-4 w-4 text-orange-600" />
            ) : (
              <Bookmark className="h-4 w-4 text-amber-400" />
            )}
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {job.is_urgent && (
            <Badge variant="destructive" className="text-xs flex items-center gap-1 bg-orange-100 text-orange-700 border-orange-300">
              <Zap className="h-3 w-3" />
              Urgent Hiring
            </Badge>
          )}
          {job.is_remote && (
            <Badge variant="secondary" className="text-xs bg-yellow-100 text-amber-700">
              Remote
            </Badge>
          )}
          <Badge variant="outline" className="text-xs border-amber-300 text-amber-700">
            {job.experience_level}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-amber-600">
            <MapPin className="h-4 w-4" />
            {job.location}
          </div>
          
          <div className="flex items-center gap-2 text-sm text-amber-600">
            <Clock className="h-4 w-4" />
            Posted {formatDate(job.created_at)}
          </div>
        </div>
        
        <p className="text-sm text-amber-800 line-clamp-2">
          {job.description}
        </p>
        
        <div className="space-y-2">
          <div className="text-lg font-semibold text-orange-600">
            {job.salary}
          </div>
          <div className="text-sm text-amber-600">
            {job.type}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1">
          {job.skills.slice(0, 3).map((skill) => (
            <Badge key={skill} variant="secondary" className="text-xs bg-orange-50 text-orange-700">
              {skill}
            </Badge>
          ))}
          {job.skills.length > 3 && (
            <Badge variant="outline" className="text-xs border-orange-300 text-orange-600">
              +{job.skills.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>
      
      <CardFooter>
        <Button
          onClick={() => onApply(job)}
          className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 transition-all duration-300 group-hover:scale-105"
        >
          Apply Now
        </Button>
      </CardFooter>
    </Card>
  );
};
