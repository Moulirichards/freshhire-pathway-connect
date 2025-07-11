
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Upload, Mic, MicOff, Send, FileText } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { jobService } from '@/services/jobService';
import { Job } from '@/lib/supabase';

interface ApplyModalProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({ job, isOpen, onClose }) => {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    email: user?.email || '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      
      recognition.onstart = () => {
        setIsRecording(true);
      };
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setCoverLetter(prev => prev + ' ' + transcript);
        setIsRecording(false);
      };
      
      recognition.onerror = () => {
        setIsRecording(false);
      };
      
      recognition.onend = () => {
        setIsRecording(false);
      };
      
      recognition.start();
    } else {
      toast({
        title: "Voice input not supported",
        description: "Please type your cover letter manually.",
      });
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setResumeFile(file);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file.",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to apply for jobs.",
        variant: "destructive"
      });
      return;
    }

    if (!resumeFile) {
      toast({
        title: "Resume required",
        description: "Please upload your resume to continue.",
        variant: "destructive"
      });
      return;
    }

    if (!personalInfo.name || !personalInfo.email) {
      toast({
        title: "Personal information required",
        description: "Please fill in your name and email.",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsSubmitting(true);
      await jobService.applyToJob(job.id, resumeFile, coverLetter);
      
      toast({
        title: "Application submitted!",
        description: `Your application for ${job.title} at ${job.company} has been submitted successfully.`,
      });
      
      onClose();
    } catch (error) {
      toast({
        title: "Application failed",
        description: error instanceof Error ? error.message : "Failed to submit application",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-600 to-amber-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              {job.logo}
            </div>
            Apply for {job.title}
          </DialogTitle>
          <DialogDescription>
            {job.company} • {job.location} • {job.salary}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-6">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-orange-600' : 'text-slate-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 1 ? 'bg-orange-600 text-white' : 'bg-slate-200'
              }`}>
                1
              </div>
              <span className="text-sm">Personal Info</span>
            </div>
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-orange-600' : 'text-slate-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 2 ? 'bg-orange-600 text-white' : 'bg-slate-200'
              }`}>
                2
              </div>
              <span className="text-sm">Resume & Cover Letter</span>
            </div>
            <div className={`flex items-center gap-2 ${step >= 3 ? 'text-orange-600' : 'text-slate-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 3 ? 'bg-orange-600 text-white' : 'bg-slate-200'
              }`}>
                3
              </div>
              <span className="text-sm">Review & Submit</span>
            </div>
          </div>

          {/* Job Summary */}
          <div className="bg-orange-50 rounded-lg p-4">
            <h3 className="font-medium text-amber-900 mb-2">{job.title}</h3>
            <p className="text-sm text-amber-700 mb-3">{job.description}</p>
            <div className="flex flex-wrap gap-1">
              {job.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs bg-orange-100 text-orange-700">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Step 1: Personal Information */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">
                    Full Name *
                  </label>
                  <Input
                    value={personalInfo.name}
                    onChange={(e) => setPersonalInfo(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    value={personalInfo.email}
                    onChange={(e) => setPersonalInfo(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1 block">
                  Phone Number
                </label>
                <Input
                  value={personalInfo.phone}
                  onChange={(e) => setPersonalInfo(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Upload Resume</h3>
                <div className="border-2 border-dashed border-amber-300 rounded-lg p-6 text-center hover:border-orange-400 transition-colors">
                  {resumeFile ? (
                    <div className="flex items-center justify-center gap-2 text-green-600">
                      <FileText className="h-5 w-5" />
                      <span>{resumeFile.name}</span>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-8 w-8 text-amber-400 mx-auto mb-2" />
                      <p className="text-amber-600 mb-2">Drag and drop your resume or</p>
                    </>
                  )}
                  <label className="cursor-pointer">
                    <Button variant="outline" size="sm" asChild className="border-orange-300 text-orange-700 hover:bg-orange-50">
                      <span>Choose File</span>
                    </Button>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  <p className="text-xs text-amber-500 mt-2">PDF files only, max 5MB</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Cover Letter (Optional)</h3>
                <div className="relative">
                  <Textarea
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    placeholder="Tell us why you're perfect for this role... or use voice input!"
                    className="min-h-[120px] pr-12 border-amber-300 focus:border-orange-500"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleVoiceInput}
                    className={`absolute top-2 right-2 p-2 ${
                      isRecording ? 'bg-red-100 text-red-600 animate-pulse' : 'hover:bg-orange-100'
                    }`}
                  >
                    {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-xs text-amber-500 mt-1">
                  {isRecording ? 'Listening... Speak now!' : 'Click the microphone to use voice input'}
                </p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Review Your Application</h3>
              
              <div className="bg-orange-50 rounded-lg p-4 space-y-3">
                <div>
                  <span className="text-sm font-medium text-amber-700">Name: </span>
                  <span className="text-sm text-amber-900">{personalInfo.name}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-amber-700">Email: </span>
                  <span className="text-sm text-amber-900">{personalInfo.email}</span>
                </div>
                {personalInfo.phone && (
                  <div>
                    <span className="text-sm font-medium text-amber-700">Phone: </span>
                    <span className="text-sm text-amber-900">{personalInfo.phone}</span>
                  </div>
                )}
                <div>
                  <span className="text-sm font-medium text-amber-700">Resume: </span>
                  <span className="text-sm text-amber-900">{resumeFile?.name || 'Not uploaded'}</span>
                </div>
                {coverLetter && (
                  <div>
                    <span className="text-sm font-medium text-amber-700">Cover Letter: </span>
                    <p className="text-sm text-amber-900 mt-1">{coverLetter}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4">
            <div>
              {step > 1 && (
                <Button variant="outline" onClick={() => setStep(step - 1)} className="border-orange-300 text-orange-700 hover:bg-orange-50">
                  Previous
                </Button>
              )}
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose} className="border-amber-300 text-amber-700 hover:bg-amber-50">
                Cancel
              </Button>
              {step < 3 ? (
                <Button 
                  onClick={() => setStep(step + 1)}
                  disabled={step === 1 && (!personalInfo.name || !personalInfo.email)}
                  className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700"
                >
                  Next
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700"
                >
                  <Send className="h-4 w-4 mr-2" />
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
