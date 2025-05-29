
import React from 'react';
import { Hero } from '@/components/Hero';
import { JobFilters } from '@/components/JobFilters';
import { JobGrid } from '@/components/JobGrid';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      <Hero onSearchResults={() => {}} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div id="job-results">
          <JobFilters />
          <JobGrid />
        </div>
      </div>
    </div>
  );
};

export default Home;
