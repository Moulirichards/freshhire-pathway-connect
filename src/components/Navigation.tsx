
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const Navigation = () => {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">FH</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              FreshHire
            </span>
            <Badge variant="secondary" className="ml-2 text-xs">
              For Freshers
            </Badge>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors">Find Jobs</a>
            <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors">My Applications</a>
            <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors">Resume Builder</a>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
