
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { useLocation } from 'react-router-dom';

export const Navigation = () => {
  const { user, signIn, signUp, signOut } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        await signUp(email, password);
        toast({
          title: "Account created!",
          description: "Please check your email to verify your account.",
        });
      } else {
        await signIn(email, password);
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in.",
        });
      }
      setShowAuthModal(false);
      setEmail('');
      setPassword('');
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Authentication failed",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    }
  };

  const navigateTo = (path: string) => {
    window.location.href = path;
  };

  return (
    <>
      <nav className="bg-white/80 backdrop-blur-md border-b border-amber-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-600 to-amber-600 rounded-lg flex items-center justify-center cursor-pointer" onClick={() => navigateTo('/')}>
                <span className="text-white font-bold text-sm">FH</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent cursor-pointer" onClick={() => navigateTo('/')}>
                FreshHire
              </span>
              <Badge variant="secondary" className="ml-2 text-xs bg-yellow-100 text-amber-800">
                For Freshers
              </Badge>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <button 
                onClick={() => navigateTo('/')}
                className={`transition-colors ${location.pathname === '/' ? 'text-orange-600' : 'text-amber-700 hover:text-orange-600'}`}
              >
                Find Jobs
              </button>
              <button 
                onClick={() => navigateTo('/applications')}
                className={`transition-colors ${location.pathname === '/applications' ? 'text-orange-600' : 'text-amber-700 hover:text-orange-600'}`}
              >
                My Applications
              </button>
              <button 
                onClick={() => navigateTo('/resume-builder')}
                className={`transition-colors ${location.pathname === '/resume-builder' ? 'text-orange-600' : 'text-amber-700 hover:text-orange-600'}`}
              >
                Resume Builder
              </button>
            </div>
            
            <div className="flex items-center space-x-3">
              {user ? (
                <>
                  <span className="text-sm text-amber-700">Welcome, {user.email}</span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleSignOut}
                    className="border-amber-300 text-amber-700 hover:bg-yellow-50"
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      setIsSignUp(false);
                      setShowAuthModal(true);
                    }}
                    className="border-amber-300 text-amber-700 hover:bg-yellow-50"
                  >
                    Sign In
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={() => {
                      setIsSignUp(true);
                      setShowAuthModal(true);
                    }}
                    className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700"
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {isSignUp ? 'Create Account' : 'Sign In'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAuth} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-orange-600 to-amber-600"
              disabled={loading}
            >
              {loading ? 'Loading...' : (isSignUp ? 'Sign Up' : 'Sign In')}
            </Button>
            <p className="text-center text-sm text-gray-600">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-orange-600 hover:underline"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
