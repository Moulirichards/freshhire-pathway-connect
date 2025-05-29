
import React from 'react';
import { Navigation } from '@/components/Navigation';
import Home from './Home';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      <Navigation />
      <Home />
    </div>
  );
};

export default Index;
