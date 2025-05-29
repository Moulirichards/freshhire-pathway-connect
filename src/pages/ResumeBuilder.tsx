
import React, { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Plus, Trash2, Download } from 'lucide-react';

interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  year: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string;
}

const ResumeBuilder = () => {
  const { user } = useAuth();
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: '',
    email: user?.email || '',
    phone: '',
    address: ''
  });
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const [loading, setLoading] = useState(false);
  const [resumeId, setResumeId] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadResume();
    }
  }, [user]);

  const loadResume = async () => {
    try {
      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .eq('user_id', user?.id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setResumeId(data.id);
        setPersonalInfo(data.personal_info || {
          name: '',
          email: user?.email || '',
          phone: '',
          address: ''
        });
        setExperiences(data.experience || []);
        setEducation(data.education || []);
        setSkills(data.skills || []);
        setProjects(data.projects || []);
      }
    } catch (error) {
      console.error('Error loading resume:', error);
    }
  };

  const saveResume = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const resumeData = {
        user_id: user.id,
        personal_info: personalInfo,
        experience: experiences,
        education: education,
        skills: skills,
        projects: projects,
        updated_at: new Date().toISOString()
      };

      if (resumeId) {
        const { error } = await supabase
          .from('resumes')
          .update(resumeData)
          .eq('id', resumeId);
        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('resumes')
          .insert(resumeData)
          .select()
          .single();
        if (error) throw error;
        setResumeId(data.id);
      }

      toast({
        title: "Success",
        description: "Resume saved successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save resume",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addExperience = () => {
    setExperiences([...experiences, {
      id: Date.now().toString(),
      company: '',
      position: '',
      duration: '',
      description: ''
    }]);
  };

  const addEducation = () => {
    setEducation([...education, {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      year: ''
    }]);
  };

  const addProject = () => {
    setProjects([...projects, {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: ''
    }]);
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Please sign in to use the resume builder</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Resume Builder</h1>
          <div className="flex gap-2">
            <Button onClick={saveResume} disabled={loading} className="bg-orange-600 hover:bg-orange-700">
              {loading ? 'Saving...' : 'Save Resume'}
            </Button>
            <Button variant="outline" className="border-orange-300 text-orange-700">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Full Name"
                  value={personalInfo.name}
                  onChange={(e) => setPersonalInfo({...personalInfo, name: e.target.value})}
                />
                <Input
                  placeholder="Email"
                  type="email"
                  value={personalInfo.email}
                  onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                />
                <Input
                  placeholder="Phone"
                  value={personalInfo.phone}
                  onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                />
                <Input
                  placeholder="Address"
                  value={personalInfo.address}
                  onChange={(e) => setPersonalInfo({...personalInfo, address: e.target.value})}
                />
              </CardContent>
            </Card>

            {/* Experience */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Experience</CardTitle>
                <Button onClick={addExperience} size="sm" variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {experiences.map((exp, index) => (
                  <div key={exp.id} className="border rounded-lg p-4 space-y-2">
                    <div className="flex justify-between items-start">
                      <div className="flex-1 space-y-2">
                        <Input
                          placeholder="Company"
                          value={exp.company}
                          onChange={(e) => {
                            const updated = [...experiences];
                            updated[index].company = e.target.value;
                            setExperiences(updated);
                          }}
                        />
                        <Input
                          placeholder="Position"
                          value={exp.position}
                          onChange={(e) => {
                            const updated = [...experiences];
                            updated[index].position = e.target.value;
                            setExperiences(updated);
                          }}
                        />
                        <Input
                          placeholder="Duration (e.g., Jan 2020 - Dec 2021)"
                          value={exp.duration}
                          onChange={(e) => {
                            const updated = [...experiences];
                            updated[index].duration = e.target.value;
                            setExperiences(updated);
                          }}
                        />
                        <Textarea
                          placeholder="Job description"
                          value={exp.description}
                          onChange={(e) => {
                            const updated = [...experiences];
                            updated[index].description = e.target.value;
                            setExperiences(updated);
                          }}
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setExperiences(experiences.filter(e => e.id !== exp.id))}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 mb-4">
                  <Input
                    placeholder="Add a skill"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                  />
                  <Button onClick={addSkill} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <div key={index} className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                      {skill}
                      <button
                        onClick={() => setSkills(skills.filter((_, i) => i !== index))}
                        className="text-orange-600 hover:text-orange-800"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview Section */}
          <div>
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle>Resume Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Personal Info Preview */}
                <div className="text-center border-b pb-4">
                  <h2 className="text-2xl font-bold text-gray-900">{personalInfo.name || 'Your Name'}</h2>
                  <p className="text-gray-600">{personalInfo.email}</p>
                  {personalInfo.phone && <p className="text-gray-600">{personalInfo.phone}</p>}
                  {personalInfo.address && <p className="text-gray-600">{personalInfo.address}</p>}
                </div>

                {/* Experience Preview */}
                {experiences.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Experience</h3>
                    {experiences.map((exp) => (
                      <div key={exp.id} className="mb-4">
                        <h4 className="font-medium">{exp.position}</h4>
                        <p className="text-sm text-gray-600">{exp.company} • {exp.duration}</p>
                        <p className="text-sm mt-1">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Skills Preview */}
                {skills.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, index) => (
                        <span key={index} className="bg-gray-100 px-2 py-1 rounded text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
