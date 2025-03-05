
import React, { useRef, useEffect } from 'react';
import { UserIcon } from 'lucide-react';

interface VideoPlayerProps {
  stream: MediaStream | null;
  muted?: boolean;
  isSelf?: boolean;
  userName?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  stream, 
  muted = false, 
  isSelf = false,
  userName = ''
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const hasVideo = stream && stream.getVideoTracks().length > 0;

  return (
    <div className={`relative rounded-2xl overflow-hidden transition-all duration-500 ${isSelf ? 'bg-black/10' : 'bg-black/20'}`}>
      {stream ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted={muted}
          className={`object-cover w-full h-full transition-opacity duration-300 ${hasVideo ? 'opacity-100' : 'opacity-0'}`}
        />
      ) : null}
      
      {(!stream || !hasVideo) && (
        <div className="absolute inset-0 flex items-center justify-center bg-secondary/30 backdrop-blur-sm">
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="bg-muted-foreground/10 rounded-full p-6">
              <UserIcon className="h-16 w-16 text-muted-foreground" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">{userName || 'No Video'}</span>
          </div>
        </div>
      )}

      {hasVideo && userName && (
        <div className="absolute bottom-3 left-3 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-lg text-white text-sm">
          {userName} {isSelf && '(You)'}
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
