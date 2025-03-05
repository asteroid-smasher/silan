
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { ArrowRight, User } from 'lucide-react';

const JoinCallForm: React.FC = () => {
  const [name, setName] = useState('');
  const [callId, setCallId] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();

  const handleStartCall = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error('Please enter your name');
      return;
    }
    
    // For creating a new call, generate a random ID
    const generatedCallId = isCreating 
      ? Math.random().toString(36).substring(2, 7).toUpperCase()
      : callId;
    
    if (!isCreating && !callId.trim()) {
      toast.error('Please enter a call ID');
      return;
    }
    
    // In a real application, we would register the call with a backend here
    // For now, just navigate to the video call page with the call ID
    navigate(`/call/${generatedCallId}`, { 
      state: { userName: name, callId: generatedCallId, isHost: isCreating } 
    });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="space-y-4 animate-slide-up">
        <div className="flex space-x-4 mb-8">
          <Button
            variant={isCreating ? "default" : "outline"}
            className="flex-1 h-12 transition-all duration-300"
            onClick={() => setIsCreating(true)}
          >
            Create Call
          </Button>
          <Button
            variant={!isCreating ? "default" : "outline"}
            className="flex-1 h-12 transition-all duration-300"
            onClick={() => setIsCreating(false)}
          >
            Join Call
          </Button>
        </div>
        
        <form onSubmit={handleStartCall} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-foreground/80">
              Your Name
            </Label>
            <div className="relative">
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="h-12 pl-10 pr-4 border-input bg-background transition-all duration-300 focus:ring-1 focus:ring-primary"
              />
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
          </div>
          
          {!isCreating && (
            <div className="space-y-2">
              <Label htmlFor="callId" className="text-sm font-medium text-foreground/80">
                Call ID
              </Label>
              <Input
                id="callId"
                type="text"
                value={callId}
                onChange={(e) => setCallId(e.target.value.toUpperCase())}
                placeholder="Enter call ID"
                className="h-12 border-input bg-background transition-all duration-300 focus:ring-1 focus:ring-primary"
              />
            </div>
          )}
          
          <Button 
            type="submit" 
            className="w-full h-12 font-medium transition-all duration-300 group"
          >
            {isCreating ? 'Create New Call' : 'Join Call'}
            <ArrowRight className="ml-2 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default JoinCallForm;
