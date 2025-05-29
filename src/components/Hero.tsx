import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Mic, MicOff, Briefcase, Users, TrendingUp } from 'lucide-react';
import { jobService } from '@/services/jobService';
import { toast } from '@/hooks/use-toast';

interface HeroProps {
  onSearchResults?: (jobs: any[]) => void;
}

export const Hero = ({ onSearchResults }: HeroProps) => {
  const [isListening, setIsListening] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Search required",
        description: "Please enter a search term",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSearching(true);
      const jobs = await jobService.getJobs({ search: searchQuery });
      
      if (onSearchResults) {
        onSearchResults(jobs);
      }
      
      toast({
        title: "Search completed",
        description: `Found ${jobs.length} jobs matching "${searchQuery}"`,
      });
      
      // Scroll to results
      document.getElementById('job-results')?.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
      toast({
        title: "Search failed",
        description: "Unable to search jobs. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const startVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
        toast({
          title: "Voice search error",
          description: "Unable to access microphone. Please try typing instead.",
          variant: "destructive",
        });
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      toast({
        title: "Voice search not supported",
        description: "Please type your search query instead.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-100 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-amber-600/10"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-amber-900 leading-tight">
              Your <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                Dream Job
              </span> Awaits
            </h1>
            <p className="text-xl text-amber-700 max-w-3xl mx-auto">
              Discover thousands of entry-level opportunities designed specifically for fresh graduates, 
              career changers, and ambitious learners ready to make their mark.
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <div className="flex rounded-2xl shadow-2xl border border-orange-200 bg-white/90 backdrop-blur-sm">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-600 h-5 w-5" />
                  <Input
                    placeholder="Search jobs, companies, or skills..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="pl-12 pr-16 py-6 text-lg border-0 rounded-l-2xl bg-transparent focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                
                <Button
                  onClick={startVoiceSearch}
                  variant="ghost"
                  size="lg"
                  className={`px-4 ${isListening ? 'text-orange-600 bg-orange-50' : 'text-amber-600 hover:bg-yellow-50'}`}
                  disabled={isListening}
                >
                  {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </Button>
                
                <Button 
                  onClick={handleSearch}
                  disabled={isSearching}
                  size="lg" 
                  className="rounded-r-2xl px-8 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700"
                >
                  {isSearching ? 'Searching...' : 'Search Jobs'}
                </Button>
              </div>
            </div>
            
            {isListening && (
              <div className="mt-4 text-center">
                <div className="inline-flex items-center space-x-2 bg-orange-100 px-4 py-2 rounded-full">
                  <div className="w-2 h-2 bg-orange-600 rounded-full animate-pulse"></div>
                  <span className="text-orange-700 text-sm">Listening...</span>
                </div>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center space-y-3 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-yellow-200">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl flex items-center justify-center mx-auto">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-amber-900">10,000+ Jobs</h3>
              <p className="text-sm text-amber-700">Fresh opportunities updated daily</p>
            </div>
            
            <div className="text-center space-y-3 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-yellow-200">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl flex items-center justify-center mx-auto">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-amber-900">500+ Companies</h3>
              <p className="text-sm text-amber-700">From startups to Fortune 500</p>
            </div>
            
            <div className="text-center space-y-3 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-yellow-200">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl flex items-center justify-center mx-auto">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-amber-900">95% Success Rate</h3>
              <p className="text-sm text-amber-700">Freshers getting hired fast</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
