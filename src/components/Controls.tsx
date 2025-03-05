
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Mic, MicOff, Video, VideoOff, Phone, MessageSquare,
  XCircle, MessagesSquare, Settings, Subtitles, PanelBottomClose
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ControlsProps {
  audioEnabled: boolean;
  videoEnabled: boolean;
  subtitlesEnabled: boolean;
  onToggleAudio: () => void;
  onToggleVideo: () => void;
  onToggleSubtitles: () => void;
  onEndCall: () => void;
}

const Controls: React.FC<ControlsProps> = ({
  audioEnabled,
  videoEnabled,
  subtitlesEnabled,
  onToggleAudio,
  onToggleVideo,
  onToggleSubtitles,
  onEndCall
}) => {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="relative">
      {/* Settings panel that slides up when settings button is clicked */}
      <div 
        className={cn(
          "absolute bottom-full mb-4 left-1/2 transform -translate-x-1/2 glass rounded-xl p-4 w-full max-w-md transition-all duration-300 ease-bounce-in",
          showSettings ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
        )}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium">Settings</h3>
          <Button 
            variant="ghost" 
            size="icon"
            className="h-8 w-8"
            onClick={() => setShowSettings(false)}
          >
            <XCircle className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-3">
          <Button 
            variant="outline" 
            className="w-full justify-start text-sm"
            onClick={onToggleSubtitles}
          >
            <Subtitles className="h-4 w-4 mr-2" />
            {subtitlesEnabled ? 'Disable' : 'Enable'} Sign Language Translation
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start text-sm"
          >
            <PanelBottomClose className="h-4 w-4 mr-2" />
            Caption Position
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start text-sm"
          >
            <MessagesSquare className="h-4 w-4 mr-2" />
            Translation Language
          </Button>
        </div>
      </div>
      
      {/* Main controls */}
      <div className="glass py-4 px-6 rounded-xl flex items-center justify-center gap-3 md:gap-5 animate-slide-up">
        <Button 
          variant="outline"
          size="icon"
          className={cn(
            "button-icon transition-all duration-300",
            audioEnabled ? "bg-secondary" : "bg-destructive/10 text-destructive"
          )}
          onClick={onToggleAudio}
        >
          {audioEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
        </Button>
        
        <Button 
          variant="outline"
          size="icon"
          className={cn(
            "button-icon transition-all duration-300",
            videoEnabled ? "bg-secondary" : "bg-destructive/10 text-destructive"
          )}
          onClick={onToggleVideo}
        >
          {videoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
        </Button>
        
        <Button 
          variant="destructive"
          size="icon"
          className="button-icon bg-destructive hover:bg-destructive/90"
          onClick={onEndCall}
        >
          <Phone className="h-5 w-5 transform rotate-135" />
        </Button>
        
        <Button 
          variant="outline"
          size="icon"
          className="button-icon bg-secondary"
        >
          <MessageSquare className="h-5 w-5" />
        </Button>
        
        <Button 
          variant="outline"
          size="icon"
          className={cn(
            "button-icon transition-all duration-300",
            showSettings ? "bg-primary/10 text-primary" : "bg-secondary"
          )}
          onClick={() => setShowSettings(!showSettings)}
        >
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default Controls;
