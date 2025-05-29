
import React, { useState } from 'react';
import { Hero } from '@/components/Hero';
import { JobFilters } from '@/components/JobFilters';
import { JobGrid } from '@/components/JobGrid';
import { Navigation } from '@/components/Navigation';

const Index = () => {
  const [searchResults, setSearchResults] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      <Navigation />
      <Hero onSearchResults={setSearchResults} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div id="job-results">
          <JobFilters />
          <JobGrid />
        </div>
      </div>
    </div>
  );
};

export default Index;
