
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { MapPin, Building, DollarSign, Filter } from 'lucide-react';

export const JobFilters = () => {
  const [salaryRange, setSalaryRange] = useState([20000]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-200 mb-8">
      <div className="flex items-center gap-2 mb-6">
        <Filter className="h-5 w-5 text-amber-600" />
        <h2 className="text-lg font-semibold text-amber-900">Smart Filters</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-amber-800 flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Location
          </label>
          <Select>
            <SelectTrigger className="border-orange-300 focus:ring-orange-500">
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bangalore">Bangalore</SelectItem>
              <SelectItem value="mumbai">Mumbai</SelectItem>
              <SelectItem value="delhi">Delhi</SelectItem>
              <SelectItem value="hyderabad">Hyderabad</SelectItem>
              <SelectItem value="pune">Pune</SelectItem>
              <SelectItem value="remote">Remote</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-amber-800 flex items-center gap-2">
            <Building className="h-4 w-4" />
            Industry
          </label>
          <Select>
            <SelectTrigger className="border-orange-300 focus:ring-orange-500">
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="it">IT & Software</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="sales">Sales</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="hr">Human Resources</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-amber-800">Job Type</label>
          <Select>
            <SelectTrigger className="border-orange-300 focus:ring-orange-500">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fulltime">Full-time</SelectItem>
              <SelectItem value="parttime">Part-time</SelectItem>
              <SelectItem value="internship">Internship</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-amber-800 flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Min Salary: ₹{salaryRange[0].toLocaleString()}
          </label>
          <Slider
            value={salaryRange}
            onValueChange={setSalaryRange}
            max={100000}
            min={10000}
            step={5000}
            className="mt-2"
          />
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="text-sm font-medium text-amber-800">Quick Filters</div>
        <div className="flex flex-wrap gap-2">
          {[
            'Remote Work',
            'No Experience Required',
            'Immediate Joining',
            'Training Provided',
            'Startup',
            'MNC',
            'Weekend Off',
            'Flexible Hours'
          ].map((filter) => (
            <Button
              key={filter}
              variant={activeFilters.includes(filter) ? "default" : "outline"}
              size="sm"
              onClick={() => toggleFilter(filter)}
              className={`rounded-full transition-all ${
                activeFilters.includes(filter)
                  ? 'bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700'
                  : 'hover:bg-yellow-50 border-orange-300 text-amber-700'
              }`}
            >
              {filter}
            </Button>
          ))}
        </div>
      </div>
      
      {activeFilters.length > 0 && (
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-orange-200">
          <div className="flex items-center gap-2">
            <span className="text-sm text-amber-600">{activeFilters.length} filters applied</span>
            <div className="flex gap-1">
              {activeFilters.map((filter) => (
                <Badge key={filter} variant="secondary" className="text-xs bg-orange-100 text-orange-700">
                  {filter}
                </Badge>
              ))}
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveFilters([])}
            className="text-amber-600 hover:text-orange-600 hover:bg-yellow-50"
          >
            Clear All
          </Button>
        </div>
      )}
    </div>
  );
};
