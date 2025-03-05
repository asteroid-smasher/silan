
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface TranslationCaptionProps {
  text: string;
  isVisible: boolean;
  position?: 'top' | 'bottom';
}

const TranslationCaption: React.FC<TranslationCaptionProps> = ({ 
  text, 
  isVisible,
  position = 'bottom'
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Simulates a typing effect when text changes
  useEffect(() => {
    if (!text) {
      setDisplayText('');
      return;
    }
    
    setIsTyping(true);
    let index = 0;
    const typingInterval = setInterval(() => {
      setDisplayText(text.substring(0, index));
      index++;
      
      if (index > text.length) {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, 30);
    
    return () => clearInterval(typingInterval);
  }, [text]);
  
  if (!isVisible) return null;
  
  return (
    <div 
      className={cn(
        "absolute left-0 right-0 px-4 transition-all duration-500 z-10",
        position === 'top' ? "top-4" : "bottom-20",
        !displayText && "opacity-0"
      )}
    >
      <div className="caption-container">
        <p className="text-lg md:text-xl font-medium text-foreground leading-relaxed">
          {displayText}
          {isTyping && <span className="inline-block w-2 h-5 ml-1 bg-primary animate-pulse" />}
        </p>
      </div>
    </div>
  );
};

export default TranslationCaption;
