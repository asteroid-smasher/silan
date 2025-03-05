
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import VideoPlayer from '@/components/VideoPlayer';
import Controls from '@/components/Controls';
import TranslationCaption from '@/components/TranslationCaption';
import Header from '@/components/Header';
import { toast } from 'sonner';
import { getUserMedia, stopMediaStream, createFakeConnection } from '@/utils/videoUtils';
import { startSignLanguageTranslation, TranslationEvent } from '@/utils/translationUtils';

const VideoCall = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract user details from location state
  const userName = location.state?.userName || 'Guest';
  const isHost = location.state?.isHost || false;
  
  // Media state
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(true);
  
  // Translation state
  const [currentTranslation, setCurrentTranslation] = useState('');
  
  // Setup media streams when component mounts
  useEffect(() => {
    const setupMedia = async () => {
      try {
        const stream = await getUserMedia();
        if (stream) {
          setLocalStream(stream);
          
          // For demonstration, create a fake remote connection
          // In a real app, this would be done via WebRTC
          setTimeout(async () => {
            const fakeRemoteStream = await createFakeConnection(stream);
            setRemoteStream(fakeRemoteStream);
            toast.success("Remote user connected");
          }, 2000);
        } else {
          toast.error("Failed to access camera and microphone");
        }
      } catch (error) {
        console.error("Error setting up media:", error);
        toast.error("Could not set up media devices");
      }
    };
    
    setupMedia();
    
    // Show welcome toast
    toast.success(`Welcome to call: ${id}`);
    
    // Cleanup function
    return () => {
      stopMediaStream(localStream);
      stopMediaStream(remoteStream);
    };
  }, [id]);
  
  // Set up sign language translation
  useEffect(() => {
    if (!subtitlesEnabled || !remoteStream) return;
    
    const handleTranslation = (event: TranslationEvent) => {
      setCurrentTranslation(event.text);
      
      // Clear translation after a few seconds
      setTimeout(() => {
        setCurrentTranslation('');
      }, 5000);
    };
    
    // Start translation service
    const cleanup = startSignLanguageTranslation(remoteStream, handleTranslation);
    
    return cleanup;
  }, [remoteStream, subtitlesEnabled]);
  
  // Handle toggling audio
  const handleToggleAudio = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach(track => {
        track.enabled = !audioEnabled;
      });
      setAudioEnabled(!audioEnabled);
    }
  };
  
  // Handle toggling video
  const handleToggleVideo = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach(track => {
        track.enabled = !videoEnabled;
      });
      setVideoEnabled(!videoEnabled);
    }
  };
  
  // Handle ending call
  const handleEndCall = () => {
    stopMediaStream(localStream);
    stopMediaStream(remoteStream);
    navigate('/');
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/30">
      <Header />
      
      <main className="flex-1 flex flex-col p-4 pt-20">
        <div className="max-w-7xl w-full mx-auto flex-1 flex flex-col">
          {/* Call information */}
          <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">{`Call: ${id}`}</h1>
              <p className="text-sm text-muted-foreground">
                {isHost ? 'You started this call' : 'You joined this call'}
              </p>
            </div>
            <div className="glass px-3 py-1 rounded-full text-sm mt-2 sm:mt-0 animate-pulse">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2" />
              Live
            </div>
          </div>
          
          {/* Video grid */}
          <div className="flex-1 grid gap-4 grid-cols-1 lg:grid-cols-2 mb-6 relative">
            <div className="relative video-container aspect-video lg:aspect-auto animate-scale-in">
              <VideoPlayer 
                stream={localStream} 
                muted={true} 
                isSelf={true} 
                userName={userName}
              />
            </div>
            
            <div className="relative video-container aspect-video lg:aspect-auto animate-scale-in" style={{ animationDelay: "0.2s" }}>
              <VideoPlayer 
                stream={remoteStream} 
                userName="Remote User"
              />
              
              <TranslationCaption 
                text={currentTranslation} 
                isVisible={subtitlesEnabled} 
              />
            </div>
          </div>
          
          {/* Controls */}
          <div className="flex justify-center mb-6">
            <Controls 
              audioEnabled={audioEnabled}
              videoEnabled={videoEnabled}
              subtitlesEnabled={subtitlesEnabled}
              onToggleAudio={handleToggleAudio}
              onToggleVideo={handleToggleVideo}
              onToggleSubtitles={() => setSubtitlesEnabled(!subtitlesEnabled)}
              onEndCall={handleEndCall}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default VideoCall;
